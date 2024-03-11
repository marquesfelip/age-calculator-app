document.getElementById('calcAge')?.addEventListener('click', calcAge)

function calcAge() {
  const inputDay = parseInt((document.getElementById('input-day') as HTMLInputElement).value)
  const inputMonth = parseInt((document.getElementById('input-month') as HTMLInputElement).value)
  const inputYear = parseInt((document.getElementById('input-year') as HTMLInputElement).value)

  const {validDay, validMonth, validYear} = validateDayMonthYearFields(inputDay, inputMonth, inputYear)

  if(!validDay || !validMonth || !validYear)
    return

  const {years, months, daysRemaining} = calcYearsMonthsDays(inputDay, inputMonth, inputYear)
  updateHtmlResult(years.toString(), months.toString(), daysRemaining.toString())
}

function validateDayMonthYearFields(dayInput: number, monthInput: number, yearInput: number) {
  resetInputFieldDesign()

  if (isNaN(dayInput) || isNaN(monthInput) || isNaN(yearInput)) {
    if (isNaN(dayInput)) {
      const elementLabelDay = document.getElementById('lbl-input-day')
      elementLabelDay?.classList.add('text-red-500')

      const elementInputDay = document.getElementById('input-day')
      const newElement = '<span id="required-day" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">This field is required</span>'
      elementInputDay?.insertAdjacentHTML('afterend', newElement)

      elementInputDay?.classList.add('border-red-500')
    }

    if (isNaN(monthInput)) {
      const elementLabelMonth = document.getElementById('lbl-input-month')
      elementLabelMonth?.classList.add('text-red-500')

      const elementInputMonth = document.getElementById('input-month')
      const newElement = '<span id="required-month" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">This field is required</span>'
      elementInputMonth?.insertAdjacentHTML('afterend', newElement)

      elementInputMonth?.classList.add('border-red-500')
    }

    if (isNaN(yearInput)) {
      const elementLabelYear = document.getElementById('lbl-input-year')
      elementLabelYear?.classList.add('text-red-500')

      const elementInputYear = document.getElementById('input-year')
      const newElement = '<span id="required-year" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">This field is required</span>'
      elementInputYear?.insertAdjacentHTML('afterend', newElement)

      elementInputYear?.classList.add('border-red-500')
    }

    return {validDay: false, validMonth: false, validYear: false}
  }

  const leapYear = (yearInput % 4 === 0 && yearInput % 100 !== 0) || (yearInput % 400 === 0)

  let daysOfMonth: number = 31;

  if (monthInput === 4 || monthInput === 6 || monthInput === 9 || monthInput === 11)
    daysOfMonth = 30
  else if (monthInput === 2)
    daysOfMonth = leapYear ? 29 : 28

  let validDay = dayInput < 1 || dayInput > daysOfMonth ? false : true
  let validMonth = monthInput < 1 || monthInput > 12 ? false : true
  let validYear = yearInput > new Date().getFullYear() ? false : true

  if (!validDay) {
    const elementLabelDay = document.getElementById('lbl-input-day')
    elementLabelDay?.classList.add('text-red-500')

    const elementInputDay = document.getElementById('input-day')
    const newElement = '<span id="required-day" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">Must be a valid day</span>'
    elementInputDay?.insertAdjacentHTML('afterend', newElement)

    elementInputDay?.classList.add('border-red-500')
  }

  if (!validMonth) {
    const elementLabelMonth = document.getElementById('lbl-input-month')
    elementLabelMonth?.classList.add('text-red-500')

    const elementInputMonth = document.getElementById('input-month')
    const newElement = '<span id="required-month" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">Must be a valid month</span>'
    elementInputMonth?.insertAdjacentHTML('afterend', newElement)

    elementInputMonth?.classList.add('border-red-500')
  }

  if (!validYear) {
    const elementLabelYear = document.getElementById('lbl-input-year')
    elementLabelYear?.classList.add('text-red-500')

    const elementInputYear = document.getElementById('input-year')
    const newElement = '<span id="required-year" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">Must be in the past</span>'
    elementInputYear?.insertAdjacentHTML('afterend', newElement)

    elementInputYear?.classList.add('border-red-500')
  }

  if (new Date().toLocaleDateString('en-CA') < `${yearInput}-${monthInput}-${dayInput}`) {
    const elementLabelYear = document.getElementById('lbl-input-year')
    elementLabelYear?.classList.add('text-red-500')

    const elementInputYear = document.getElementById('input-year')
    const newElement = '<span id="required-year" class="poppins-regular-italic text-[9px] md:text-[13px] text-red-500">Must be in the past</span>'
    elementInputYear?.insertAdjacentHTML('afterend', newElement)

    elementInputYear?.classList.add('border-red-500')

    return {validDay: false, validMonth: false, validYear: false}
  }

  return {validDay, validMonth, validYear}
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

function resetInputFieldDesign() {
  const requiredDay = document.getElementById('required-day')
  const requiredMonth = document.getElementById('required-month')
  const requiredYear = document.getElementById('required-year')

  requiredDay?.remove()
  requiredMonth?.remove()
  requiredYear?.remove()

  const elementLabelDay = document.getElementById('lbl-input-day')
  elementLabelDay?.classList.remove('text-red-500')

  const elementLabelMonth = document.getElementById('lbl-input-month')
  elementLabelMonth?.classList.remove('text-red-500')

  const elementLabelYear = document.getElementById('lbl-input-year')
  elementLabelYear?.classList.remove('text-red-500')

  const elementInputDay = document.getElementById('input-day')
  elementInputDay?.classList.remove('border-red-500')

  const elementInputMonth = document.getElementById('input-month')
  elementInputMonth?.classList.remove('border-red-500')

  const elementInputYear = document.getElementById('input-year')
  elementInputYear?.classList.remove('border-red-500')
}