import ConfirmRegisterEmail
	from "../../../../../src/application/usecases/user/RegisterEmailConfirmation/ConfirmRegisterEmail";
import { RegisterEmailUserRepository }
	from "../../../../../src/application/usecases/user/RegisterEmailConfirmation/Interfaces";

class FakeRepository implements RegisterEmailUserRepository {

	findByConfirmLink(confirmLink: string): Promise<boolean> {
		return Promise.resolve(true);
	}

	removeConfirmLink(confirmLink: string): Promise<void> {
		return Promise.resolve();
	}

}

describe("Unit Tests Of ConfirmRegisterEmail", () => {
	it('should be able to call correctly the funcitons', async () => {
		const fakeRepo = new FakeRepository();
		const findLinkMethodSpy = jest.spyOn(fakeRepo, "findByConfirmLink");
		const removeLinkMethodSpy = jest.spyOn(fakeRepo, "removeConfirmLink");
		const useCase = new ConfirmRegisterEmail(fakeRepo);
		const link = "https://test.com";

		await useCase.execute(link);

		expect(findLinkMethodSpy).toHaveBeenCalledTimes(1);
		expect(findLinkMethodSpy).toHaveBeenCalledWith(link);
		expect(removeLinkMethodSpy).toHaveBeenCalledTimes(1);
		return expect(removeLinkMethodSpy).toHaveBeenCalledWith(link);
	});
});