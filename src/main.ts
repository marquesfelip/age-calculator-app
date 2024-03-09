document.getElementById('calcAge')?.addEventListener('click', calcAge)

function calcAge() {
  const inputDay = parseInt((document.getElementById('input-day') as HTMLInputElement).value)
  const inputMonth = parseInt((document.getElementById('input-month') as HTMLInputElement).value)
  const inputYear = parseInt((document.getElementById('input-year') as HTMLInputElement).value)

  const {day, month, year} = validateDayMonthYearFields(inputDay, inputMonth, inputYear)

  const {years, months, daysRemaining} = calcYearsMonthsDays(inputDay, inputMonth, inputYear)
  updateHtmlResult(years.toString(), months.toString(), daysRemaining.toString())
}

function validateDayMonthYearFields(dayInput: number, monthInput: number, yearInput: number) {
  let day, month, year

  const leapYear = (yearInput % 4 === 0 && yearInput % 100 !== 0) || (yearInput % 400 === 0)

  let daysOfMonth: number = 31;

  if (monthInput === 4 || monthInput === 6 || monthInput === 9 || monthInput === 11)
    daysOfMonth = 30
  else if (monthInput === 2)
    daysOfMonth = leapYear ? 29 : 28

  day = dayInput < 1 || dayInput > daysOfMonth || Number.isNaN(dayInput) ? false : true
  month = monthInput < 1 || monthInput > 12 || Number.isNaN(monthInput) ? false : true
  year = yearInput > new Date().getFullYear() || Number.isNaN(yearInput) ? false : true

  return {day, month, year}
}

function calcYearsMonthsDays(day: number, month: number, year: number) {
  const dateInitial = new Date(`${month}/${day}/${year}`)
  const dateFinal = new Date()

  let diff = Math.abs(dateFinal.valueOf() - dateInitial.valueOf())

  // A Day in milliseconds
  const aDay = 1000 * 60 * 60 * 24

  const years = Math.floor(diff / (aDay * 365))
  diff -= years * aDay * 365

  const leapYear = Math.floor((dateFinal.getFullYear() - dateInitial.getFullYear() + 1) / 4)

  let daysRemaining = Math.floor(diff / aDay) - leapYear;

  let months = 0;
  while (daysRemaining >= 28) {
      const monthNow = dateInitial.getMonth() + months + 1;
      const daysInMonth = new Date(dateInitial.getFullYear(), monthNow, 0).getDate();
      if (daysRemaining >= daysInMonth) {
        daysRemaining -= daysInMonth;
          months++;
      } else {
          break;
      }
  }

  return {years, months, daysRemaining}
}

function updateHtmlResult(years: string, months: string, days:string) {
  (document.getElementById('text-year') as HTMLSpanElement).innerText = years;
  (document.getElementById('text-month') as HTMLSpanElement).innerText = months;
  (document.getElementById('text-day') as HTMLSpanElement).innerText = days;
}
