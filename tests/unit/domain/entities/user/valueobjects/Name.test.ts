import { InvalidNameError } from "@domain/entities/user/errors";
import { Name } from "@domain/entities/user/valueobjects";

describe("Unit Tests of Name Value Object", () => {
    it("Should be able to create an instance", () => {
        const name = new Name("gabriel", "lopes");
        expect(name.firstName).toBe("gabriel");
        expect(name.lastName).toBe("lopes");
        return expect(name.fullName).toBe("gabriel lopes");
    });

    it("Should not be able to create an instance by receiving empty first name", () => {
        const invalidNameParameters = [
            { fName: "", lName: "Lopes" },
            { fName: "Gabriel", lName: "" },
        ];
        invalidNameParameters.forEach(({ fName, lName }) => {
            const attemptToCreateNameWithoutFirstName = () =>
                new Name(fName, lName);
            expect(attemptToCreateNameWithoutFirstName).toThrow(
                InvalidNameError
            );
        });
    });
});
