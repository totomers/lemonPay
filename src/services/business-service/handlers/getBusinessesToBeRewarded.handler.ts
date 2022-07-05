import { connectToDatabase } from 'src/database/db';
import { Business } from 'src/database/models/business';
import { Promotion } from 'src/database/models/promotion';
import { IPromotionDocument } from 'src/types/promotion.interface';

export async function getBusinessesToBeRewardedHandler() {
  try {
    await connectToDatabase();
    const rewardedForBeingReferred = await getRewardedForBeingReferred();
    const rewardedForReferring = await getRewardedForReferring();

    // const referralRewards = await getReferralRewards();

    const result = rewardedForBeingReferred.concat(rewardedForReferring);

    return result;
  } catch (error) {
    return error;
  }
}

async function getRewardedForBeingReferred() {
  try {
    // const promotions = await Promotion.find().populate('businessId');

    const promotions = await Promotion.aggregate([
      {
        $match: {
          $and: [
            { status: { $not: { $eq: 'closed' } } },
            { type: 'referredByBusiness' },
          ],
        },
      },
      {
        $lookup: {
          from: 'businesses',
          foreignField: '_id',
          localField: 'businessId',
          as: 'business',
          pipeline: [
            {
              $project: {
                bankAccountIban: 1,
                businessTradeName: 1,
                rootUser: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$business',
        },
      },
      {
        $lookup: {
          from: 'businesses',
          foreignField: '_id',
          localField: 'businessReferred',
          as: 'businessReferred',
          pipeline: [
            {
              $project: {
                businessTradeName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$businessReferred',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: {
            id: '$businessId',
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
      { $match: { 'transactions.totalAmount': { $gte: 30 } } },
      { $project: { transactions: 0 } },
    ]);

    return promotions;
  } catch (error) {
    console.log(error);
  }
}

// async function getRewardedForBeingReferred1() {
//   try {
//     await connectToDatabase();
//     const rewardedForBeingReferred = await Business.aggregate([
//       {
//         $match: {
//           $and: [
//             { referrerCode: { $exists: true } },
//             { wasReferredAndRedeemed: false },
//           ],
//         },
//       },
//       {
//         $lookup: {
//           from: 'transactions',
//           let: {
//             id: '$_id',
//           },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: [
//                     { $toObjectId: '$$id' },
//                     { $toObjectId: '$businessId' },
//                   ],
//                 },
//               },
//             },
//             {
//               $group: {
//                 _id: '$businessId',
//                 totalAmount: { $sum: '$amount' },
//               },
//             },
//           ],
//           as: 'transactions',
//         },
//       },
//       {
//         $unwind: {
//           path: '$transactions',
//         },
//       },
//       { $match: { 'transactions.totalAmount': { $gte: 100 } } },
//       { $project: { bankAccountIban: 1, businessTradeName: 1 } },
//     ]);

//     return rewardedForBeingReferred;
//   } catch (error) {
//     console.log(error);

//     return error;
//   }
// }

async function getRewardedForReferring() {
  try {
    const promotions = await Promotion.aggregate([
      {
        $match: {
          $and: [
            { status: { $not: { $eq: 'closed' } } },
            { type: 'referredABusiness' },
          ],
        },
      },
      {
        $lookup: {
          from: 'businesses',
          foreignField: '_id',
          localField: 'businessId',
          as: 'business',
          pipeline: [
            {
              $project: {
                bankAccountIban: 1,
                businessTradeName: 1,
                rootUser: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$business',
        },
      },
      {
        $lookup: {
          from: 'businesses',
          foreignField: '_id',
          localField: 'businessReferred',
          as: 'businessReferred',
          pipeline: [
            {
              $project: {
                businessTradeName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$businessReferred',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: {
            id: '$businessReferred._id',
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
          as: 'transactionsOfBusinessReferred',
        },
      },
      // {
      //   $unwind: {
      //     path: '$transactionsOfBusinessReferred',
      //   },
      // },
      { $match: { 'transactionsOfBusinessReferred.0': { $exists: true } } },
      { $project: { transactionsOfBusinessReferred: 0 } },
    ]);

    return promotions;
  } catch (error) {
    console.log(error);
  }
}

async function getRewardedForReferring1() {
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
