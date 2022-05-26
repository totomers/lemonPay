/**
 * ====================================================================================================
 * Edit user
 * @param params
 * ====================================================================================================
 */

export async function editUserAccountHandler(params: {
  email: string;
  edittedUser: Partial<IUserDocument>;
}): Promise<{ updatedUser: IUserDocument } | CustomError> {
  try {
    await connectToDatabase();

    const { edittedUser, email } = params;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        edittedUser,
      }
    );

    // await CognitoService.updateUserAttributes({
    //   attributes:[{...},{...},{...}]
    //   email: user.email,
    // });

    return { updatedUser };
  } catch (err) {
    throw new MongoCustomError(err);
  }
}
