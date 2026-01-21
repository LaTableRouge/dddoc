import { Datepicker } from 'vanillajs-datepicker'
// Ajouter une langue au datepicker
import fr from 'vanillajs-datepicker/locales/fr'

const calendarElement = document.querySelector('.js-calendar')
if (calendarElement) {
  // Ajouter une langue au datepicker
  Object.assign(Datepicker.locales, fr)
  const datepicker = new Datepicker(calendarElement, {
    language: 'fr'
  })

  // Set de la date focused
  const nowDate = new Date()
  nowDate.setFullYear(nowDate.getFullYear() + 10) // Ajout de 10 ans à la date du jour pour l'exemple
  datepicker.setFocusedDate(nowDate, true)

  // Get de la date focused
  datepicker.getFocusedDate('dd M')
}
