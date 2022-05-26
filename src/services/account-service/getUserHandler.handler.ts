
/**
 * ====================================================================================================
 * Get User
 * @param params
 * ====================================================================================================
 */
 export async function getUserHandler(params: { email: string }) {
    try {
      await connectToDatabase();
  
      const { email = 'tomere@moveo.co.il' } = params;
      const user = (await User.findOne({ email })
        .populate({
          path: 'businesses',
          populate: {
            path: 'business',
            model: 'business',
            select: { businessName: 1 },
          },
        })
        .exec()) as IUserDocument;
  
      const status = await CognitoService.getUserStatusHandler({ email });
  
      //@ts-ignore
      return { ...user._doc, status };
    } catch (err) {
      throw new MongoCustomError(err);
    }
  }