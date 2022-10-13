import { getPrefixCls, classNames } from "../classname";

describe("test classname", () => {
  it("getPrefixCls normal", () => {
    const cls = getPrefixCls("btn");

    expect(cls).toBe("neko-btn");
  });

  it("getPrefixCls custom prefix", () => {
    const cls = getPrefixCls("btn", "m");

    expect(cls).toBe("m-btn");
  });

  it("classNames", () => {
    const cls = classNames(["btn", "m"]);

    expect(cls).toBe("btn m");
    const clss = classNames(["btn", null, "a", 1 > 2 && "s", "m"]);

    expect(clss).toBe("btn a m");
  });
});
