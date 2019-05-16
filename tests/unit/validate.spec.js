import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)

import Validator from "../../src/validate"

describe("Validate", () => {
	it("存在.", () => {
		expect(Validator).to.exist
	})
	it("required true error", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", required: true }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.required).to.eq("必填")
	})
	it("required true passed", () => {
		let data = {
			email: 0,
		}
		let rules = [{ key: "email", required: true }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("pattern error", () => {
		let data = {
			email: "@brendan.com",
		}
		let rules = [{ key: "email", pattern: /^.+@.+$/ }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.pattern).to.eq("格式不正确")
	})
	it("pattern passed", () => {
		let data = {
			email: "1@brendan.com",
		}
		let rules = [{ key: "email", pattern: /^.+@.+$/ }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("pattern email error", () => {
		let data = {
			email: "@brendan.com",
		}
		let rules = [{ key: "email", pattern: "email" }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.pattern).to.eq("格式不正确")
	})
	it("pattern email passed", () => {
		let data = {
			email: "1@brendan.com",
		}
		let rules = [{ key: "email", pattern: "email" }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email).to.not.exist
	})
	it("require & pattern", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", pattern: "email", required: true }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.required).to.exist
		expect(errors.email.pattern).to.not.exist
	})
	it("pattern & minLength", () => {
		let data = {
			email: "",
		}
		let rules = [{ key: "email", pattern: "email", minLength: 6 }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.minLength).to.exist
		expect(errors.email.pattern).to.exist
	})
	it("maxLength", () => {
		let data = {
			email: "123123123123",
		}
		let rules = [{ key: "email", pattern: "email", maxLength: 10 }]
		let validator = new Validator()
		let errors = validator.validate(data, rules)
		expect(errors.email.maxLength).to.exist
	})
	it("test keys", () => {
		let data = {
			email: "checkcheckcheck@gmail.com",
		}
		let rules = [
			{
				key: "email",
				required: true,
				minLength: 6,
				maxLength: 20,
				hasNumber: true,
				hasLowerCaseAndUpperCase: true,
				hasDot: true,
				hasUnderscore: true,
				hasZealot: true,
			},
		]
		let fn = () => {
			let validator = new Validator()
			validator.validate(data, rules)
		}
		expect(fn).to.throw()
	})
	it("custom rule", () => {
		let data = {
			email: "cxkcxkcxk@gmail.com",
		}
		let validator = new Validator()
		validator.hasNumber = (value) => {
			if (!/\d/.test(value)) {
				return "必须含有数字"
			}
		}
		let rules = [
			{
				key: "email",
				required: true,
				minLength: 6,
				maxLength: 20,
				hasNumber: true,
			},
		]
		let errors
		let fn = () => {
			errors = validator.validate(data, rules)
		}
		expect(fn).to.not.throw()
		expect(errors.email.hasNumber).to.eq("必须含有数字")
	})
	it("两个 validator 互不影响", () => {
		let data = {
			email: "cxkcxkcxk@gmail.com",
		}
		let validator1 = new Validator()
		let validator2 = new Validator()
		validator1.hasNumber = (value) => {
			if (!/\d/.test(value)) {
				return "必须含有数字"
			}
		}
		let rules = [
			{
				key: "email",
				required: true,
				hasNumber: true,
			},
		]
		let errors
		expect(() => {
			validator1.validate(data, rules)
		}).to.not.throw()
		expect(() => {
			validator2.validate(data, rules)
		}).to.throw()
	})
	it("全局添加规则", () => {
		let data = {
			email: "cxkcxkcxk@gmail.com",
		}
		let validator1 = new Validator()
		let validator2 = new Validator()
		Validator.add("hasNumber", (value) => {
			if (!/\d/.test(value)) {
				return "必须含有数字"
			}
		})
		let rules = [
			{
				key: "email",
				required: true,
				hasNumber: true,
			},
		]
		let errors
		expect(() => {
			validator1.validate(data, rules)
		}).to.not.throw()
		expect(() => {
			validator2.validate(data, rules)
		}).to.not.throw()
	})
})
