export default function userPageCalcAge (birthDay:string):string {
    const birthDate     = new Date(birthDay)
    const difference    = Date.now() - birthDate.getTime()
    const ageDate       = new Date(difference)
    const calculatedAge =  Math.abs(ageDate.getUTCFullYear() - 1970);

    return `${calculatedAge} лет.`;
}