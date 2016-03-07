import 'lvm-las-assets'
import $ from 'jquery'
import simplete from 'simplete'
import moment from 'moment'

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

  $('time[datetime]').each(function (idx, item) {
    moment.locale('de')
    let time = moment($(item).attr('datetime')).local()

    // replace content with relative time
    $(item).attr('content', time.format('LLLL')).text(time.fromNow())

    // show title (absolute time) as a bootstrap popover
    $(item).data({
      'content': time.format('LLLL'),
      'placement': 'right',
      'toggle': 'popover'
    })
    $(item).popover({
      trigger: 'hover focus',
      container: 'body'
    })
  })
})
