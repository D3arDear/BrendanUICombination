import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)
import validate from "../../src/validate"

describe("validate", () => {
	it("存在.", () => {
		expect(validate).to.exist
	})
	it("required true error", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", required: true }]
		let errors = validate(data, rules)
		expect(errors.email.required).to.eq("必填")
	})
	it("required true passed", () => {
		let data = {
			email: 0,
		}
		let rules = [{ key: "email", required: true }]
		let errors = validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("pattern error", () => {
		let data = {
			email: "@brendan.com",
		}
		let rules = [{ key: "email", pattern: /^.+@.+$/ }]
		let errors = validate(data, rules)
		expect(errors.email.pattern).to.eq("格式不正确")
	})
	it("pattern passed", () => {
		let data = {
			email: "1@brendan.com",
		}
		let rules = [{ key: "email", pattern: /^.+@.+$/ }]
		let errors = validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("pattern email error", () => {
		let data = {
			email: "@brendan.com",
		}
		let rules = [{ key: "email", pattern: "email" }]
		let errors = validate(data, rules)
		expect(errors.email.pattern).to.eq("格式不正确")
	})
	it("pattern email passed", () => {
		let data = {
			email: "1@brendan.com",
		}
		let rules = [{ key: "email", pattern: "email" }]
		let errors = validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("require & pattern", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", pattern: "email", required: true }]
		let errors = validate(data, rules)
		expect(errors.email.required).to.exist
		expect(errors.email.pattern).to.not.exist
	})
	it("pattern & minLength", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", pattern: "email", minLength: 6 }]
		let errors = validate(data, rules)
		expect(errors.email.minLength).to.exist
		expect(errors.email.pattern).to.exist
	})
})
