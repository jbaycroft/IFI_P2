// INCLUDE BOOTSTRAP CSS
document.write('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">');
// INCLUDE BOOTSTRAP JS
document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha256-Sk3nkD6mLTMOF0EOpNtsIry+s1CsaqQC1rVLTAy+0yc= sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>');
// $(document).ready(function() {
//     var request = $.ajax({
//         url: 'https://www.googleapis.com/freebase/v1/text/en/bob_dylan',
//         type: 'GET',
//         dataType: 'jsonp',
//         success: function (data) {
//             // Append each data point as a new row in table
//             $.each(data, function(index, element) {
//                 var row = $("<tr></tr>");
//                 for (var index in element) row.append($('<td>').text(element[index]));
//                 $('tbody').append(row);
//             });
//         },
//         error: function() { alert('boo!'); }
//         //beforeSend: function (xhr){
//          //   xhr.setRequestHeader('x-user', 'USERNAME');
//          //   xhr.setRequestHeader('x-password','PASSWORD');
//         //}
//     }).done(function(data, statusText, xhr){
//         var status = xhr.status;                //200
//         console.log(status);
//         var head = xhr.getAllResponseHeaders(); //Detail header info
//         console.log(head);
//     });
//     console.log(request);
//
// });
$(document).ready(function() {
    //DRAW ROOT TABLE
    $('<ul class="nav nav-tabs nav-pills"  style="border-color: #777777; color:#fff;" role="tablist"><li role="presentation" class="active"><a href="#T10assignees" aria-controls="T10assignees" role="tab" data-toggle="tab">US Grants</a></li><li role="presentation"><a href="#T10grants" aria-controls="T10grants" role="tab" data-toggle="tab">US Applications</a></li></ul><div class="tab-content well col-xs-12"><!-- TOP 10 ASSIGNESS TABLE --><div role="tabpanel" class="tab-pane active" id="T10assignees"><!-- Top 10 AssigneesTable --><table class="table table-striped table-condensed" id="assignees" style="font-size:10px;"><thead><tr><th>Rank</th><th>2015</th><th>Country</th><th>Company</th><th>2014</th></tr></thead><tbody></tbody></table></div><!-- END TOP 10 ASSIGNESS TABLE --><!-- TOP 10 PRE_GRANT TABLE --><div role="tabpanel" class="tab-pane" id="T10grants"><!-- Top 10 AssigneesTable --><table class="table table-striped table-condensed" id="grants" style="font-size:10px;"><thead><tr><th>Rank</th><th>2015</th><th>Country</th><th>Company</th><th>2014</th></tr></thead><tbody></tbody></table></div><!-- END TOP 10 PRE_GRANT --></div>').appendTo($("#p2table"));
  $.getJSON('assigness.json', function(data){
    
    //isolate 2015 data
    var ty = data.content[2015];
    //isolate by_year info
    var by = data.content.by_year;
    // Log 2015 data
    console.log(ty);
    // Log by year Data
    console.log(by)
    // Draw table based on json data
    drawTable(by,ty,"assignees");
  });
  $.getJSON('pregrant.json', function(data){
    //isolate 2015 data
    var ty = data.content[2015];
    //isolate by_year info
    var by = data.content.by_year;
    // Log 2015 data
    console.log(ty);
    // Log by year Data
    console.log(by)
    // Draw table based on json data
    drawTable(by,ty,"grants");
  });
});
//Function to draw a table appended to associated table
// ty = This year (2015)
// by = BY year (past 5 years)
// table = Table id to append info to (ie. assignees, or grants)
function drawTable(by,ty,table) {
  for (var i = 0; i < ty.length; i++) {
    var rank = i+1;
    var cname = ty[i].name;
    // Define additional data hash
    var ad = {};
    // Find this ranked company in by_year data 
    $.each(by, function(i, v) {
        $.each(v, function(i,v) {
            if(i === cname) {
                ad["country"] = v.country;
                ad["lastyear"] = v.stats[4].count;
                console.log(ad);
            } else {
                return;
            }
        });
    });
    drawRow(ad,ty[i],rank,table);
  }
}
//Function to draw a row within table
function drawRow(byRowData,tyRowData,rank,table) {
    var row = $("<tr />")
    $("#" + table).append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rank + "</td>"));
    row.append($("<td>" + tyRowData.count + "</td>"));
    row.append($("<td>" + byRowData.country + "</td>"));
    row.append($("<td>" + tyRowData.name + "</td>"));
    row.append($("<td>" + byRowData.lastyear + "</td>"));
}
