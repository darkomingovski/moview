import {createUser} from '../user';

describe('createUser', () => {

    it('should return object', () => {
        expect(createUser(0)).toEqual({"favorites": [], "planned": [], "watched": []});
    });

    it('should return null', () => {
        expect(createUser(1)).toEqual(null);
    });

    it('should return undefined', () => {
        expect(createUser(Math.floor(Math.random() * 100))).toEqual(undefined);
    });

});