import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { shallowMount, mount } from "@vue/test-utils";
import TabsBody from "../../src/tabs/tabs-pane";
import { italic } from "ansi-colors";
chai.use(sinonChai);

describe("TabsPane.vue", () => {
  it("存在", () => {
    expect(TabsBody).to.exist;
  });
});
