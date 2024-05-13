export const regPhone = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/

export const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])$/
// /^([0-9a-zA-Z_\.\-\])+\@([0-9a-zA-Z_\.\-\])+\.([a-zA-Z]+)$/
export const regChineseName = /^([\u4E00-\u9FA5]|[A-Za-z]|\u2022|\.){1,}$/ // 中文名称

export const regChineseIdCard =
  /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)\d{15}(\d|X|x)$/ // 居民身份证

export const regHKMoPassPort = /(^[hm]\d{8}$)/i // 港澳居民来往内地通行证

export const regTWIdPassPort = /^\d{8}$/ // 台湾居民来往大陆通行证

export const regAPRIdCard = /^[A-Za-z]{3}\d{12}$/ // 外国人永久居留身份证

export const regHKMoResidentCart = /^(810000|820000)\d{11}(\d|X|x)$/ // 港澳居民居住证

export const regTWResidentCart = /^(830000)\d{11}(\d|X|x)$/ // 台湾居民居住证

export const regPassPort = /^([A-Za-z]|[0-9]){6,9}$/ // 护照

export const regHMTliveIdCard = /^8[1-3]\d{15}[x\d]$/i

export const regPublicResource = /^-\d{9}=/

export const regNum = /^[0-9]*$/

export const regSpecial = /^[(（\u4E00-\u9FA5A-Za-z0-9、，,。/（）())]+$/ //  是否有特殊字符

// 6位以上数字或字母
export const reg6NumOrString = /^[a-zA-Z0-9]{6,66}$/

/**
 * 校验手机号
 *
 * @param {string} value
 * @returns
 */
export const verifyPhone = (value: string) => regPhone.test(value)
/**
 * 校验是否有特殊字符
 *
 * @param {string} value
 * @returns
 */
export const verifySpecial = (value: string) => regSpecial.test(value)

export const regChinese = /.*[\u4E00-\u9FA5]+.*$/
export function removeHtmlTag(str: string) {
  return str?.replace(/<[^>]+>/g, '')
}
