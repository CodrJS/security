import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { JwtSecurity } from "..";

describe("JwtSecurity", () => {
  it("creates and verifies successfully", () => {
    const security = new JwtSecurity({ aud: "jest", iss: "test" });

    // create token.
    const token = security.sign("test-1234", { hello: "world" });
    // verify token with same signing key.
    const decoded = security.verify(token) as JwtPayload;

    // expect an output, using subject for test.
    expect(decoded.sub).toEqual("test-1234");
  });

  it("creates and verifies unsuccessfully", () => {
    const security = new JwtSecurity({ aud: "jest", iss: "test" });

    // create token
    const token = security.sign("test-1234", { hello: "world" });

    // invalidate the signing key by rotating
    security.rotate();

    // expect the signing to fail.
    expect(() => security.verify(token)).toThrow(JsonWebTokenError);
    expect(() => security.verify(token)).toThrow("invalid signature");
  });
});
