(function($) {


var defaults = {

  CountMonths: 2,
  Startyear: new Date().getFullYear(),
  Startmonth: new Date().getMonth(),
  existDiscounts: true,
  Buttons: false
};

$.fn.Calendarify = function(options, Discounts) {

var element = this;

var data = {};

var init = function()	{

 options = $.extend(defaults, options);
  if (options.existDiscounts) {setDiscounts(Discounts)};
  render(element);
}


var dateFromString = function(value){

	value = value.split('-');
    return new Date(value[0], value[1] - 1, value[2]);

}

var setDiscounts = function(Discounts) {

    for (var i = 0; i < Discounts.length; i++)

        {

        	var currentdate = dateFromString(Discounts[i].date);
            var year = currentdate.getFullYear().toString();
            var month = (currentdate.getMonth()).toString();
            var day = currentdate.getDate().toString();
            
            if (!data[year]) {
                data[year] = {};
            }
            
            if (!data[year][month]) {
                data[year][month] = {};
            }

            data[year][month][day] = Discounts[i].discount;

        }


}

var getDiscount = function(year, month, day) {

        nodiscount = 0;

        if (!data[year])
        {
            return nodiscount;
        }
        if (!data[year][month])
        {
            return nodiscount;
        }
        if (!data[year][month][day])
        {
            return nodiscount;
        }
        
        return data[year][month][day];
    }


var render = function(element){

  var Endmonth = options.Startmonth + options.CountMonths;
  var Disable = false;

  element.find('.calendar-wrapper').remove();
  element.find('.prev').remove();
  element.find('.next').remove();

	for(var j = options.Startmonth; j < Endmonth; j++) {


	var D = new Date(options.Startyear, j, 1);
	var DYear = D.getFullYear();
	var DMonth = D.getMonth();
	var DateLast = new Date(DYear, DMonth + 1, 0).getDate();
	var DateWeekLast = new Date(DYear, DMonth, DateLast).getDay();
	var DateWeekFirst = new Date(DYear, DMonth, 1).getDay();


	var month = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
	var tr = '<tr>';

	if (DateWeekFirst !== 0) {

  for(var  i = 1; i < DateWeekFirst; i++) {tr += '<td>'};

	} else {

  for(var  i = 0; i < 6; i++) {tr += '<td>'};

	}

for(var  i = 1; i <= DateLast; i++) {

 if (i < new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {

  Disable = true;
  tr += '<td>';
  
  } else if (getDiscount(DYear, DMonth, i) !== 0) {

  	switch (getDiscount(DYear, DMonth, i)) {

  		case '50': tr += '<td class="price50">' + i; break;
      case '40': tr += '<td class="price40">' + i; break;
      case '30': tr += '<td class="price30">' + i; break;
      case '20': tr += '<td class="price20">' + i; break;
  		case '10': tr += '<td class="price10">' + i; break;
  	}

} else {

    tr += '<td>' + i;
  }

  if (new Date(DYear,DMonth,i).getDay() == 0) {
    tr += '<tr>';
  }

}

if (DateWeekLast !== 0) {

for(var  i = DateWeekLast; i < 7; i++) {tr += '<td>'};

}

  var table = $('<div class="calendar-wrapper"><div class="calendar-header">'+month[DMonth] +' '+ DYear+'</div><div class="calendar-container"><table class="discount-table"><thead><tr><th>Пн<th>Вт<th>Ср<th>Чт<th>Пт<th>Сб<th>Вс<tbody></table></div></div>').appendTo(element);
	var tbody = $(table).find('tbody');

	$(tbody).append(tr);

}

if (options.Buttons) {initButtons(element);}

if (Disable) {element.find('.prev').hide();} else {element.find('.prev').show();}

}

var initButtons = function(element) {

  var prev = $(element).find('.calendar-header:first');
  var next = $(element).find('.calendar-header:last');

  $('<div class="prev">&#9668;</div>').prependTo(prev);
  $('<div class="next">&#9658;</div>').prependTo(next);

  element.find('.prev').on('click', function() {

    options.Startmonth -= 1;
    render(element);

  });

  element.find('.next').on('click', function() {

    options.Startmonth += 1;
    render(element);

  });


}

init();

return this;

};

})(jQuery);