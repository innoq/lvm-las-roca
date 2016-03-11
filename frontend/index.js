import 'lvm-las-assets'
import $ from 'jquery'
import simplete from 'simplete'
import moment from 'moment'

require('./postbox')

console.log('Welcome')

$(() => {
  // init Simplete autocompletion
  $('.autocomplete').each((_i, field) => {
    simplete(field, {
      itemSelector: '.onebox-results>.list-group-item',
      minLength: 3,
      resultWrapper: '.onebox-results',
      selectedClass: 'current'
    })
  })

  $('time[datetime]').each((_i, item) => {
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

  // active tabs via this snippet to provide simple
  // anchor based tab navigation if javascript is disabled
  // TODO: move into lvm-las-assets?
  $('.nav-tabs').each((_i, item) => {
    let tabContent = $(item).next()
    if (tabContent) {
      // add class to initialize bootstrap tabs
      tabContent.addClass('tab-content')

      // show first tab content
      let firstTabContent = tabContent.find('div:first-child')
      firstTabContent.addClass('active')
    }

    let firstTabNav = $(item).find('li:first-child')
    if (firstTabNav) {
      // set first item as current selected tab
      firstTabNav.addClass('active')
    }
  })
})
