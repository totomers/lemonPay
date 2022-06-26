import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';

export async function getBusinessesToBeRewardedHandler() {
  try {
    const rewardedForBeingReferred = await getRewardedForBeingReferred();
    const rewardedForReferring = await getRewardedForReferring();

    const result = {
      referred: rewardedForBeingReferred,
      referrers: rewardedForReferring,
    };
    return result;
  } catch (error) {
    return error;
  }
}

async function getRewardedForBeingReferred() {
  try {
    await connectToDatabase();
    const rewardedForBeingReferred = await Business.aggregate([
      {
        $match: {
          $and: [
            { referrerCode: { $exists: true } },
            { wasReferredAndRedeemed: false },
          ],
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: {
            id: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    { $toObjectId: '$$id' },
                    { $toObjectId: '$businessId' },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$businessId',
                totalAmount: { $sum: '$amount' },
              },
            },
          ],
          as: 'transactions',
        },
      },
      {
        $unwind: {
          path: '$transactions',
        },
      },
      { $match: { 'transactions.totalAmount': { $gte: 100 } } },
      { $project: { bankAccountIban: 1, businessTradeName: 1 } },
    ]);

    return rewardedForBeingReferred;
  } catch (error) {
    console.log(error);

    return error;
  }
}

async function getRewardedForReferring() {
  try {
    await connectToDatabase();
    const rewardedForBeingReferred = await Business.aggregate([
      {
        $match: {
          businessesReferred: { $exists: true, $ne: [] },
        },
      },
      {
        $project: {
          _id: 1,
          bankAccountIban: 1,
          businessTradeName: 1,
          businessesReferred: {
            $filter: {
              input: '$businessesReferred',
              as: 'businessReferred',
              cond: {
                $eq: ['$$businessReferred.wasReferrerRedeemed', false],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$businessesReferred',
        },
      },
      {
        $lookup: {
          from: 'transactions',
          foreignField: 'businessId',
          localField: 'businessesReferred.business',
          pipeline: [
            {
              $group: {
                _id: '$businessId',
                count: { $count: {} },
              },
            },
            { $project: { count: 1 } },
          ],
          as: 'transaction',
        },
      },
      {
        $unwind: {
          path: '$transaction',
        },
      },
      { $match: { 'transaction.count': { $gte: 1 } } },
      {
        $lookup: {
          from: 'businesses',
          foreignField: '_id',
          localField: 'businessesReferred.business',
          pipeline: [{ $project: { businessTradeName: 1 } }],
          as: 'businessReferred',
        },
      },
      {
        $unwind: {
          path: '$businessReferred',
        },
      },
      {
        $group: {
          _id: '$_id',
          businessesReferred: {
            $push: '$businessReferred',
          },
          bankAccountIban: { $first: '$bankAccountIban' },
          businessTradeName: { $first: '$businessTradeName' },
        },
      },
    ]);

    return rewardedForBeingReferred;
  } catch (error) {
    console.log(error);

    return error;
  }
}
