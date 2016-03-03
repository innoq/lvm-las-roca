import 'lvm-las-assets'
import $ from 'jquery'
import simplete from 'simplete'

console.log('Welcome')

$(document).ready(() => {
  // init Simplete autocompletion
  $('.autocomplete').each((i, field) => {
    simplete(field, {
      itemSelector: '.onebox-results>.list-group-item',
      minLength: 3,
      resultWrapper: '.onebox-results',
      selectedClass: 'current'
    })
  })
})
