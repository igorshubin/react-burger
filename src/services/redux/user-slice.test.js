import userSlice, {userUpdateData, userUpdate, userNewPage} from "./user-slice";
import {DataDefault} from "./store";


test('USER INITIAL STATE', () => {
    expect(userSlice(undefined, {type: 'unknown'}))
        .toEqual(DataDefault.user);
});
