// 身份证号码校验
export const certIDTest = function(s) {
	const isIntChar = RegExp(/^\d{6}\d{4}(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])\d{3}(\d|X)$/)
	return (isIntChar.test(s))
}

// 手机号码校验
export const mobileNoTest = function(s) {
	const isIntChar = RegExp(/^1(([3578]\d)|(47)|(7[07]))\d{8}$/)
	return (isIntChar.test(s))
}

// 固定电话验证规则：数字+-
export const phone = function(s) {
	var isIntChar = RegExp(/^(\+)?([0-9]+)-([0-9]+)$/)
	return (isIntChar.test(s))
}

// 真实姓名校验规则1:只能是2-6个汉字
export const realNameZh = function(s) {
	const isIntChar = RegExp(/^[\u4e00-\u9fa5]+$/)
	console.log(isIntChar.test(s), s)
	return (isIntChar.test(s))
}

// 真实姓名校验规则2:汉字(包括中文的·)、英文(包括英文的空格和.)
export const realName = function(s) {
	const isIntChar = RegExp(/^([\u4e00-\u9fa5\·]{1,20}|[a-zA-Z\.\s]{1,20})$/)
	return (isIntChar.test(s))
}

// 登录用户名校验
export const userNameTest = function(s) {
	const isIntChar = RegExp(/[^0-9a-zA-Z\_\u4E00-\u9FA5]/gm)
	return (isIntChar.test(s))
}

// 地址校验
export const addressTest = function(s) {
	const isIntChar = RegExp(/[^0-9a-zA-Z\ \-\_\.\|\~\·\@\(\)\*\^\u4E00-\u9FA5]/gm)
	return (isIntChar.test(s))
}

// 纯下划线校验
export const isEnglish = function(s) {
	const isIntChar = RegExp(/^[a-zA-Z]+$/)
	return (isIntChar.test(s))
}

// 纯英文校验
export const pureEnglishTest = function(s) {
	const isIntChar = RegExp(/^[a-zA-Z]+$/)
	return (isIntChar.test(s))
}

// 密码检验规则校验字母、数字组合、特殊字符只包含下划线
export const passWordTest = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9(\_)]+$/)
	return (isIntChar.test(s))
}

// 密码校验规则:密码必须包含大小写字母数字和特殊字符   8-20个字符
export const passWordTest2 = function(s) {
	// var isIntChar = RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,20}$/);
	var isIntChar = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)
	return (isIntChar.test(s))
}

// 验证码校验规则:只包含数字或者字母
export const verifyCodeTest = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9]+$/)
	return (isIntChar.test(s))
}

// 邮箱校验
export const emailTest = function(s) {
	const isIntChar = RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
	return (isIntChar.test(s))
}

// 邮编校验规则:只包含数字6位
export const postalCode = function(s) {
	var isIntChar = RegExp(/^\d{6}$/)
	return (isIntChar.test(s))
}

// 统一社会信用代码证校验规则:只包含数字18位
export const creditCode = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9]{18}$/)
	return (isIntChar.test(s))
}

// 统一社会信用代码证校验规则: 15或18位
export const creditCode2 = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/)
	return isIntChar.test(s)
}

// 快递单号
export const express = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9]+$/)
	return (isIntChar.test(s))
}

//校验非空
export const nokong = function(s) {
	var isIntChar = RegExp(/^\S/);
	return (isIntChar.test(s));
}

// 校验护照
export const passportTest = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z0-9]{5,17}$/)
	return isIntChar.test(s)
}

// 校验台湾通行证
export const taiwanPassTest = function(s) {
	var isIntChar = RegExp(/^[a-zA-Z][0-9]{9}$/)
	return isIntChar.test(s)
}

// 校验港澳通行证
export const gangaoPassTest = function(s) {
	var isIntChar = RegExp(/^([A-Z]\d{6,10}(\w1)?)$/)
	return isIntChar.test(s)
}

// 校验港澳居民往来内地通行证
export const gangaoPassTest2 = function(s) {
	var isIntChar = RegExp(/^[HM]\d{10}$/)
	return isIntChar.test(s)
}

// 台湾居民往来内地通行证
export const taiwanPassTest2 = function(s) {
	var isIntChar = RegExp(/^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/)
	return isIntChar.test(s)
}

// 外国人永久居留证
export const foreignerPassTest = function(s) {
	var isIntChar = RegExp(/^[A-Z]{3}\d{6}(?:0[1-9]|1[021])(?:0[1-9]|[21]\d|3[10])\d{2}$/)
	return isIntChar.test(s)
}

// 111000答案转化ABC
export const getnumberda = function(val) {
	let strdata = val + ''
	let str = ''
	try {
		let arr = strdata.split('')
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] == '1') {
				if (i == 0) {
					str = str + 'A'
				}
				if (i == 1) {
					str = str + 'B'
				}
				if (i == 2) {
					str = str + 'C'
				}
				if (i == 3) {
					str = str + 'D'
				}
				if (i == 4) {
					str = str + 'E'
				}
				if (i == 5) {
					str = str + 'F'
				}
				if (i == 6) {
					str = str + 'G'
				}
				if (i == 7) {
					str = str + 'H'
				}
				if (i == 8) {
					str = str + 'I'
				}
				if (i == 9) {
					str = str + 'J'
				}
			}
		}
	} catch (error) {

	}

	return str
}
