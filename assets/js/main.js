$(document).ready(function(){

  $.ajax({
    type:'get',
    url:'proxy.php',
    data: {path:'/about/'},
    dataType:'json'
  }).done(function(json){
    // alert(json.quoteAuthor);
  });

  //get the contact form dialog
  $( function() {
    $( "#contactForm" ).dialog({
      autoOpen: false,
      width:600,
      height:600,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fold",
        duration: 1000
      }
    });
    $( "#openContact" ).on( "click", function() {
      $( "#contactForm" ).dialog( "open" );
    });
  } );

  //about side
  xhr('get',{path:'/about/'},'#about').done(function(json){
    $('#about').append('<h1>'+json.title+'</h1><p>'+json.description+'</p>');
    $('#about').append('<h4><i class="fa fa-quote-left">'+json.quote+'</i><i class="fa fa-quote-right"></i></h4><p style="color:#e55032">-'+json.quoteAuthor+'</p>');
  });

  //undergraduate degrees side
  $('#underDegrees1').append('<h2><i class="fa fa-3x fa-globe"></i></h2>');
  $('#underDegrees2').append('<h2><i class="fa fa-3x fa-address-card"></i></h2>');
  $('#underDegrees3').append('<h2><i class="fa fa-3x fa-laptop"></i></h2>');
  xhr('get',{path:'/degrees/undergraduate/'},'#undergraduate').done(function(json){
    $.each(json.undergraduate,function(i, item){
      var $dialog = $('<div id="dialog' + (i+1) + '" title="'+ item.title+ '">'+ item.concentrations+'</div>');
      $('#underDegrees'+(i+1)).append('<h3>'+item.title+'</h3>'+'<p>'+item.description+'</p>');
      $('#underDegrees'+(i+1)).append($dialog);
      $('#underDegrees'+(i+1)).append('<button id="openDialog' + (i+1) + '"><i class="fa fa-2x fa-plus-circle"></i></button>');
      $('#underDegrees'+(i+1)).append('<h6>Click to find out more</h6>');
      //open dialog by clicking undergraduate degrees
      $( function() {
        $( "#dialog" +(i+1)).dialog({
          autoOpen: false,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#openDialog" +(i+1) ).on( "click", function() {
          $( "#dialog"+(i+1) ).dialog( "open" );
        });
      } );
    });

  });

  //graduate degrees side
  $('#graduateDegrees1').append('<h2><i class="fa fa-3x fa fa-desktop"></i></h2>');
  $('#graduateDegrees2').append('<h2><i class="fa fa-3x fa fa-file"></i></h2>');
  $('#graduateDegrees3').append('<h2><i class="fa fa-3x fa fa-server"></i></h2>');
  xhr('get',{path:'/degrees/graduate/'},'#graduate').done(function(json){
    $.each(json.graduate,function(i, item){
      var $dialog = $('<div id="dialog' + (i+4) + '" title="'+ item.title+ '">'+ item.concentrations+'</div>');
      $('#graduateDegrees'+(i+1)).append('<h3>'+item.title+'</h3>'+'<p>'+item.description+'</p>');
      $('#graduateDegrees'+(i+1)).append($dialog);
      $('#graduateDegrees'+(i+1)).append('<button id="openDialog' + (i+4) + '"><i class="fa fa-2x fa-plus-circle"></i></button>');
      $('#graduateDegrees'+(i+1)).append('<h6>Click to find out more</h6>');

      if(i==3){
      $('#graduate').append('<h2 style="text-align:center; text-transform: uppercase; color:white">'+item.degreeName+'<i class="fa fa-certificate"></i></h2>');
      for(var j=0; j<item.availableCertificates.length;j++){
      $('#graduate').append('<h4 style="text-align:center; color:white">'+item.availableCertificates[j]+'<i class="fa fa-ravelry"></i></h4>');
      }
    }
      //open dialog by clicking graduate degrees
      $( function() {
        $( "#dialog" +(i+4)).dialog({
          autoOpen: false,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#openDialog" +(i+4) ).on( "click", function() {
          $( "#dialog"+(i+4) ).dialog( "open" );
        });
      } );
    });
  });

  //Undergraduate Minors side
  xhr('get',{path:'/minors/'},'#underMinor').done(function(json){
    $('#underMinorH2').append('<h2>Our Undergraduate Minors</h2>');
    $('#underMinorH2').append('<p>Expand your field of study</p>');
    //minor divs
    $('#underMinor').append('<button id="underMinor1" style="background-color:#ff9a9e"<h2><i class="fas fa-4x fa-database"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor2" style="background-color:#fda085"<h2><i class="fas fa-4x fa fa-map-marker"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor3" style="background-color:#9890e3"<h2><i class="fas fa-4x fa fa-code"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor4" style="background-color:#46698d"<h2><i class="fas fa-4x fa fa-mobile"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor5" style="background-color:#d299c2"<h2><i class="fas fa-4x fa fa-sitemap"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor6" style="background-color:#6e8dcc"<h2><i class="fas fa-4x fa fa-university"></i></h2></button>');
    $('#underMinor').append('<button id="underMinor7" style="background-color:#ff9a44"<h2><i class="fas fa-4x fa fa-object-ungroup"></i></h2></button>');

    $.each(json.UgMinors,function(i, item){
      var $dialog = $('<div id="minorDialog' + (i+1)+ '"><h1>'+ item.title+'</h1></div>');
      $dialog.append('<p>' + item.description +'</p>');
      $dialog.append('<h5>Notes</h5>');
      $dialog.append('<p>' + item.note +'</p>');
      $dialog.append('<h5>Courses</h5>');
      for(var j=0;j<item.courses.length;j++){
        var $course = $('<button id="courseButton">' +item.courses[j]+'</button>');
        $dialog.append($course);
      }
      $('#underMinor'+(i+1)).append($dialog);
      $('#underMinor'+(i+1)).append('<h3 id="underMinorH3">'+item.name+'</h3>');
      //open dialog by clicking undergraduate minors
      $( function() {
        $( "#minorDialog" +(i+1)).dialog({
          autoOpen: false,
          width:1200,
          height:600,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#underMinor" +(i+1)).on( "click", function() {
          $( "#minorDialog" +(i+1)).dialog( "open" );
        });
      } );
    });
  });

  //Academic excellence equals career performance side
  xhr('get',{path:'/employment/introduction/'},'#academic').done(function(json){
    $.each(json.introduction,function(i, item){
      if(i=='title'){
        $('#academic').append('<h1>'+item+'</h1>');
      }
      else if(i=='content'){
        $('#academic').append('<h2>'+item[0].title+'</h2>');
        $('#academic').append('<h3>'+item[0].description+'</h3>');
        $('#academic').append('<h2>'+item[1].title+'</h2>');
        $('#academic').append('<h3>'+item[1].description+'</h3>');
      }
    });
  });

  //degreeStatistics
  xhr('get',{path:'/employment/degreeStatistics/'},'#academic').done(function(json){
    $.each(json.degreeStatistics,function(i, item){
      if(i=='title'){
        $('#academic').append('<h1>'+item+'</h1>');
      }
      else if(i=='statistics'){

        for(var i=0; i<item.length;i++){
          $('#academic').append('<div id="statistics' +(i+1) + '" style="background-color:#6c7387; color:white"><h2>'+item[i].value+'</h2>'+'<h3>'+item[i].description+'</h3></div>');
        }
      }
    });
  });

  //employers name
  xhr('get',{path:'/employment/employers/'},'#academic').done(function(json){
    $.each(json.employers,function(i, item){
      if(i=='title'){
        $('#academic').append('<h1>'+item+'</h1>');
      }
      else if(i=='employerNames'){
        var employerNames = '\t';
        for(var i=0; i<item.length;i++){
          employerNames += item[i]+"\t";
        }
        $('#academic').append('<pre>'+employerNames+'</pre>');
      }
    });
  });

  //careers name
  xhr('get',{path:'/employment/careers/'},'#academic').done(function(json){
    $.each(json.careers,function(i, item){
      if(i=='title'){
        $('#academic').append('<h1>'+item+'</h1>');
      }
      else if(i=='careerNames'){
        var careerNames = '\t';
        for(var i=0; i<item.length;i++){
          careerNames += item[i]+"\t";
        }
        $('#academic').append('<pre>'+careerNames+'</pre>');
      }
    });
  });

  //co-op table
  xhr('get',{path:'/employment/coopTable/'},'#work').done(function(json){
    $.each(json.coopTable,function(i, item){
      if(i=='title'){
        $('#work').append('<h2>'+"To view employment and coop history of our students, click below."+'</h2>');
        $('#work').append('<button id="coopTable" style="background-color:#a53333;color:white"><h2>'+item+'</button>');
      }
      else if(i=='coopInformation'){
        var $dialog = $('<div id="coopDialog"><h1>Recent Student Coop Jobs (6/2013-9/2015)</h1></div>');
        var $table = $('<table id="example" class="display" style="width:100%"></table>');
        var $thread = $('<thead></thead>');
        $thread.append('<tr><th>DEGREE</th><th>EMPLOYER</th><th>LOCATION</th><th>TERM</th></tr>');
        var $tbody = $('<tbody></tbody>');
        for(var i=0; i<item.length;i++){
          $tbody.append('<tr><td>' + item[i].degree + '</td><td>' + item[i].employer + '</td><td>' + item[i].city + '</td><td>' + item[i].term + '</td></tr>');
        }
        $table.append($thread);
        $table.append($tbody);

        $dialog.append($table);
        $('#work').append($dialog);
        //open dialog to show co-op table
        $( function() {
          $( "#coopDialog").dialog({
            autoOpen: false,
            width:1300,
            height:600,
            show: {
              effect: "blind",
              duration: 1000
            },
            hide: {
              effect: "fold",
              duration: 1000
            }
          });
          $( "#coopTable").on( "click", function() {
            $( "#coopDialog").dialog( "open" );
          });
        } );

        $('#example').DataTable( {
          "pagingType": "full_numbers"
        } );
      }
    });
  });

  //employmentTable table
  xhr('get',{path:'/employment/employmentTable/'},'#work').done(function(json){
    $.each(json.employmentTable,function(i, item){
      if(i=='title'){
        $('#work').append('<button id="employmentTable" style="background-color:#3b8458;color:white"><h2>'+item+'</button>');
      }
      else if(i=='professionalEmploymentInformation'){
        var $dialog = $('<div id="workDialog"><h1>Graduating Student Employment (12/2010-01/2017)</h1></div>');
        var $table = $('<table id="workTable" class="display" style="width:100%"></table>');
        var $thread = $('<thead></thead>');
        $thread.append('<tr><th>DEGREE</th><th>EMPLOYER</th><th>CITY</th><th>TITLE</th><th>START DATE</th></tr>');
        var $tbody = $('<tbody></tbody>');
        for(var i=0; i<item.length;i++){
          $table.append('<tr><td>' + item[i].degree + '</td><td>' + item[i].employer + '</td><td>' + item[i].city + '</td><td>' + item[i].title + '</td><td>' + item[i].startDate +'</td></tr>');
        }
        $table.append($thread);
        $table.append($tbody);

        $dialog.append($table);
        $('#work').append($dialog);
        //open dialog to show professional Employment Information table
        $( function() {
          $( "#workDialog").dialog({
            autoOpen: false,
            width:1300,
            height:600,
            show: {
              effect: "blind",
              duration: 1000
            },
            hide: {
              effect: "fold",
              duration: 1000
            }
          });
          $( "#employmentTable").on( "click", function() {
            $( "#workDialog").dialog( "open" );
          });
        } );

        $('#workTable').DataTable( {
          "pagingType": "full_numbers"
        } );
      }
    });
  });

  //Our people side
  xhr('get',{path:'/people/'},'#people').done(function(json){
    var $tabDiv1 = $('<div id="tabs-1"></div>');
    //get faculty information
    $.each(json.faculty,function(i, item){
      var $isTab = $('<button id="peopleTab' + (i) + '" style="background-color:#738956; color:white"><h3>'+ item.name +'</h3><p>' + item.title + '</p></button>');
      var $dialog = $('<div id="facultyDialog' + (i)+ '"><h3>'+ item.name + ', <span class="spanClass">' + item.title + '</span></h3></div>');
      $dialog.append('<img src="' + item.imagePath + '">');

      var $contactDiv = $('<div id="contactDiv"></div>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-map-marker-alt"></i>  ' + item.office +'</h6>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-phone"></i>  ' + item.phone +'</h6>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-envelope"></i> ' + item.email +'</h6>');
      $contactDiv.append('<h6>' + item.website +'</h6>');

      $dialog.append($contactDiv);
      $isTab.append($dialog);
      $tabDiv1.append($isTab);
      $('#tabs').append($tabDiv1);

      //open dialog by clicking faculty's name
      $( function() {
        $( "#facultyDialog" +(i)).dialog({
          autoOpen: false,
          width:600,
          height:300,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#peopleTab" +(i)).on( "click", function() {
          $( "#facultyDialog" +(i)).dialog( "open" );
        });
      } );
    });
    //get staff information
    var $tabDiv2 = $('<div id="tabs-2"></div>');
    $.each(json.staff,function(i, item){
      var $isTab = $('<button id="peopleTab' + (i+100) + '" style="background-color:#738956; color:white"><h3>'+ item.name +'</h3><p>' + item.title + '</p></button>');
      var $dialog = $('<div id="staffDialog' + (i+100)+ '"><h3>'+ item.name + ', <span class="spanClass">' + item.title + '</span></h3></div>');
      $dialog.append('<img src="' + item.imagePath + '">');

      var $contactDiv = $('<div id="contactDiv"></div>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-map-marker-alt"></i>  ' + item.office +'</h6>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-phone"></i>  ' + item.phone +'</h6>');
      $contactDiv.append('<h6><i class="fas fa-1x fa-envelope"></i> ' + item.email +'</h6>');
      $contactDiv.append('<h6>' + item.website +'</h6>');

      $dialog.append($contactDiv);
      $isTab.append($dialog);
      $tabDiv2.append($isTab);
      $('#tabs').append($tabDiv2);
      //open dialog by clicking staff's name
      $( function() {
        $( "#staffDialog" +(i+100)).dialog({
          autoOpen: false,
          width:600,
          height:350,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#peopleTab" +(i+100)).on( "click", function() {
          $( "#staffDialog" +(i+100)).dialog( "open" );
        });
      } );
    });
  });

  //faculty research by Interest
  xhr('get',{path:'/research/byInterestArea/'},'#research').done(function(json){
    $('#research').append('<h1>Faculty Research: Areas of Interest</h1>');
    $('#research').append('<p>Click the area you’re interested in to explore our faculty publications</p>');
    //interest divs
    $('#research').append('<button id="interest1" style="background-color:#ff9a9e"<h3><i class="fas fa-2x fa fa-user"></i></h3></button>');
    $('#research').append('<button id="interest2" style="background-color:#fda085"<h3><i class="fas fa-2x fa fa-pencil-square-o"></i></h3></button>');
    $('#research').append('<button id="interest3" style="background-color:#9890e3"<h3><i class="fas fa-2x fa fa-map-marker"></i></h3></button>');
    $('#research').append('<button id="interest4" style="background-color:#46698d"<h3><i class="fas fa-2x fa fa-database"></i></h3></button>');
    $('#research').append('<button id="interest5" style="background-color:#d299c2"<h3><i class="fas fa-2x fa fa-line-chart"></i></h3></button>');
    $('#research').append('<button id="interest6" style="background-color:#a3bded"<h3><i class="fas fa-2x fa fa-object-group"></i></h3></button>');
    $('#research').append('<button id="interest7" style="background-color:#ff9a44"<h3><i class="fas fa-2x fa fa-sitemap"></i></h3></button>');
    $('#research').append('<button id="interest8" style="background-color:#f4d03f"<h3><i class="fas fa-3x fa fa-mobile"></i></h3></button>');
    $('#research').append('<button id="interest9" style="background-color:#738956"<h3><i class="fas fa-2x fa fa-heartbeat"></i></h3></button>');
    $('#research').append('<button id="interest10" style="background-color:#ff7969"<h3><i class="fas fa-2x fa fa-file-o"></i></h3></button>');
    $('#research').append('<button id="interest11" style="background-color:#dd7535"<h3><i class="fas fa-2x fa fa-server"></i></h3></button>');
    $('#research').append('<button id="interest12" style="background-color:#836890"<h3><i class="fas fa-2x fa fa-play-circle-o"></i></h3></button>');
    $.each(json.byInterestArea,function(i, item){
      var $dialog = $('<div id="interestDialog' + (i+1)+ '"><h1>Research By Domain Area: '+ item.areaName+'</h1></div>');
      var $ulTag = $('<ul></ul');
      for(var k=0; k<item.citations.length;k++){
        var $liTag = $('<li>' + item.citations[k] + '</li><');
        $ulTag.append($liTag);
      }
      $dialog.append($ulTag);
      $('#interest'+(i+1)).append($dialog);
      $('#interest'+(i+1)).append('<h4 id="interestH4">'+item.areaName+'</h4>');
      //open dialog by clicking research insterest topics
      $( function() {
        $( "#interestDialog" +(i+1)).dialog({
          autoOpen: false,
          width:1200,
          height:600,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });
        $( "#interest" +(i+1)).on( "click", function() {
          $( "#interestDialog" +(i+1)).dialog( "open" );
        });
      } );
    });
  });

  //faculty research by Faculty
  xhr('get',{path:'/research/'},'#research1').done(function(json){

    $('#research1').append('<h2 style="color:#e55032; text-align:center">Faculty Research: Lookup by Faculty</h2>');
    $('#research1').append('<p style="text-align:center">Click the faculty member to explore their recent publications</p>');
    var userName = [];
    var facultyName =[];
    var citationsList = [];
    var facultyCitationsList = [];
    var stop=0;
    $.each(json.byFaculty,function(i, item){
      citationsList = [];
      userName.push(item.username);
      facultyName.push(item.facultyName);
      for(var x=0;x<item.citations.length;x++){
        citationsList.push(item.citations[x]);
      }
      facultyCitationsList.push(citationsList);
    });
    xhr('get',{path:'/people/'},'#research1').done(function(json){
      if(stop ==0){
        $.each(json.faculty,function(i, item){
          for(var j=0;j<userName.length;j++){
            if(userName[j] == item.username){
              var $imgButton = $('<button id="facultyImg' + (i) + '"style = "width:10%; height:20%; float:left; margin-left:4%; margin-top:3%"><img src="' + item.imagePath + '"style = "width:100%; height:100%"></button>');
              var $dialog = $('<div id="imgDialog' + (i)+ '"><h1>'+ facultyName[j]+'</h1></div>');
              var $ul = $('<ul></ul>');
              for(var n=0; n<facultyCitationsList[j].length;n++){
                $ul.append('<li>' + facultyCitationsList[j][n] + '</li>');
              }
              $dialog.append($ul);
              $imgButton.append($dialog);
              $('#research1').append($imgButton);
              //open dialog by clicking faculty's picture
              $( function() {
                $( "#imgDialog" +(i)).dialog({
                  autoOpen: false,
                  width:1200,
                  height:600,
                  show: {
                    effect: "blind",
                    duration: 1000
                  },
                  hide: {
                    effect: "fold",
                    duration: 1000
                  }
                });
                $( "#facultyImg" +(i)).on( "click", function() {
                  $( "#imgDialog" +(i)).dialog( "open" );
                });
              } );
            }
          }
          stop=1;
        });
      }
    });
  });

  //student resources side
  //co-op enrolloment
  xhr('get',{path:'/resources/'},'#resources').done(function(json){
    $('#resources').append('<h1>'+json.title+'</h1>');
    $('#resources').append('<p>'+json.subTitle+'</p>');
    $('#resources').append('<button id="coopEnrollment" style="background-color:inherit; border:none"><i class="fa fa-3x fa-bookmark" style="color:white;">Coop Enrollment</i></button>');
    $('#resources').append('<button id="graduateForms" style="background-color:inherit; border:none"><i class="fa fa-3x fa-bookmark" style="color:white">Forms</i></button>');
    $('#resources').append('<button id="tutorsAndLabInformation" style="background-color:inherit; border:none"; color:black><i class="fa fa-3x fa-bookmark" style="color:white">Tutor/Lab Information</i></button>');
    $('#resources').append('<button id="studentAmbassadors" style="background-color:inherit; border:none"><i class="fa fa-3x fa-bookmark" style="color:white">Student Ambassadors</i></button>');
    $('#resources').append('<button id="studyAbroad" style="background-color:inherit; border:none"><i class="fa fa-3x fa-bookmark" style="color:white">Study Abroad</i></button>');
    $('#resources').append('<button id="studentServices" style="background-color:inherit; border:none"><i class="fa fa-3x fa-bookmark" style="color:white">Student Services</i></button>');
    $.each(json.resources,function(i, item){

    });
  });



  xhr('get',{path:'/resources/coopEnrollment/'},'#resources').done(function(json){
    $.each(json.coopEnrollment,function(i, item){
      if(i=='title'){
        $('#coopEnrollment').append('<div id="coopEnrollmentDialog"><h1>'+item+'</h1></div>');
      }else if(i=='enrollmentInformationContent'){
        for(var i=0; i<item.length;i++){
          $('#coopEnrollmentDialog').append('<p>'+item[i].title+item[i].description+'</p>');
        }
      }
    });
         //open dialog by clicking coopEnrollment div
         $( function() {
          $( "#coopEnrollmentDialog").dialog({
            autoOpen: false,
            width:1200,
            height:600,
            show: {
              effect: "blind",
              duration: 1000
            },
            hide: {
              effect: "fold",
              duration: 1000
            }
          });
          $( "#coopEnrollment").on( "click", function() {
            $( "#coopEnrollmentDialog").dialog( "open" );
          });
        } );
  });

  // //forms
  xhr('get',{path:'/resources/forms/'},'#resources').done(function(json){
    $('#graduateForms').append('<div id="formsDialog"></div>');
    $.each(json.forms,function(i, item){
      if(i=='graduateForms'){
        for(var i=0; i<item.length;i++){
          $('#formsDialog').append('<h2> Form Name: '+item[i].formName+'</h2><li>Href: '+item[i].href+'</li>');
        }
      }
    });
     //open dialog by clicking graduateForms div
     $( function() {
      $( "#formsDialog").dialog({
        autoOpen: false,
        width:1200,
        height:600,
        show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "fold",
          duration: 1000
        }
      });
      $( "#graduateForms").on( "click", function() {
        $( "#formsDialog").dialog( "open" );
      });
    });
  });

  //tutors and lab information
  xhr('get',{path:'/resources/tutorsAndLabInformation/'},'#resources').done(function(json){
    $('#tutorsAndLabInformation').append('<div id="tutorDialog"></div>');
    $.each(json.tutorsAndLabInformation,function(i, item){
      if(i=='title'){
        $('#tutorDialog').append('<h1>'+item+'</h1>');
      }else if(i=='description'){
        $('#tutorDialog').append('<p>'+item+'</p>');
    }else if(i=='tutoringLabHoursLink'){
        $('#tutorDialog').append('<a href="'+item+'">'+item+'</a>');
      }
    });
     //open dialog by clicking tutorsAndLabInformation div
     $( function() {
      $( "#tutorDialog").dialog({
        autoOpen: false,
        width:1200,
        height:600,
        show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "fold",
          duration: 1000
        }
      });
      $( "#tutorsAndLabInformation").on( "click", function() {
        $( "#tutorDialog").dialog( "open" );
      });
    });
  });

  //studentAmbassadors
  xhr('get',{path:'/resources/studentAmbassadors/'},'#resources').done(function(json){
    $('#studentAmbassadors').append('<div id="AmbassadorsDialog"></div>');
    $.each(json.studentAmbassadors,function(i, item){
      if(i=='title'){
        $('#AmbassadorsDialog').append('<h1>'+item+'</h1>');
      }
      else if(i=='ambassadorsImageSource'){
        $('#AmbassadorsDialog').append('<img src="'+item+'">');
      }
      else if(i=='subSectionContent'){
        for(var i=0; i<item.length;i++){
          $('#AmbassadorsDialog').append('<h2>'+item[i].title+'</h2><li>'+item[i].description+'</li>');
        }
      }
    });
        //open dialog by clicking studentAmbassadors div
        $( function() {
          $( "#AmbassadorsDialog").dialog({
            autoOpen: false,
            width:1200,
            height:600,
            show: {
              effect: "blind",
              duration: 1000
            },
            hide: {
              effect: "fold",
              duration: 1000
            }
          });
          $( "#studentAmbassadors").on( "click", function() {
            $( "#AmbassadorsDialog").dialog( "open" );
          });
        });
      });

  //studyAbroad
  xhr('get',{path:'/resources/studyAbroad/'},'#resources').done(function(json){
    $('#studyAbroad').append('<div id="AbroadDialog"></div>');
    $.each(json.studyAbroad,function(i, item){
      if(i=='title'){
        $('#AbroadDialog').append('<h1>'+item+'</h1>');
      }
      else if(i=='description'){
        $('#AbroadDialog').append('<p>'+item+'</p>');
      }
      else if(i=='places'){
        for(var i=0; i<item.length;i++){
          $('#AbroadDialog').append('<h2>'+item[i].nameOfPlace+'</h2><li>'+item[i].description+'</li>');
        }
      }
    });
   //open dialog by clicking studyAbroad div
   $( function() {
    $( "#AbroadDialog").dialog({
      autoOpen: false,
      width:1200,
      height:600,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fold",
        duration: 1000
      }
    });
    $( "#studyAbroad").on( "click", function() {
      $( "#AbroadDialog").dialog( "open" );
    });
  });
});

  //studentServices

  xhr('get',{path:'/resources/studentServices/'},'#resources').done(function(json){
    $('#studentServices').append('<div id="servicesDialog"></div>');
    $.each(json.studentServices,function(i, item){
      if(i=='title'){
        $('#servicesDialog').append('<h1>'+item+'</h1>');
      }
      else if(i=='academicAdvisors'){
        $('#servicesDialog').append('<h2>'+item.title+'</h2>');
        $('#servicesDialog').append('<p>'+item.description+'</p>');
      }
      else if(i=='professonalAdvisors'){
        $('#servicesDialog').append('<h2>'+item.title+'</h2>');

         for(var j=0; j<item.advisorInformation.length;j++){
        $('#servicesDialog').append('<li>'+item.advisorInformation[j].name+ ' ('+ item.advisorInformation[j].email + ')' + item.advisorInformation[j].department +'</li>');
      }
    }
    else if(i=='facultyAdvisors'){
      $('#servicesDialog').append('<h2>'+item.title+'</h2>');
      $('#servicesDialog').append('<p>'+item.description+'</p>');
    } else if(i=='istMinorAdvising'){
      $('#servicesDialog').append('<h2>'+item.title+'</h2>');
       for(var l=0; l<item.minorAdvisorInformation.length;l++){
      $('#servicesDialog').append('<li>'+item.minorAdvisorInformation[l].title+ ' ('+ item.minorAdvisorInformation[l].advisor + ')' + item.minorAdvisorInformation[l].email +'</li>');
    }
  }
    });
   //open dialog by clicking studyAbroad div
   $( function() {
    $( "#servicesDialog").dialog({
      autoOpen: false,
      width:1200,
      height:600,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fold",
        duration: 1000
      }
    });
    $( "#studentServices").on( "click", function() {
      $( "#servicesDialog").dialog( "open" );
    });
  });
});


  //news
  xhr('get',{path:'/news/older/'},'#newsDialog').done(function(json){
    $.each(json.older,function(i, item){
      $('#newsDialog').append('<p>'+item.date+"\n"+item.title+"\n"+item.description+"\n"+'</p>');
      //get the news dialog
      $( function() {
        $( "#newsDialog" ).dialog({
          autoOpen: false,
          height: 400,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "fold",
            duration: 1000
          }
        });

        $( "#openNews" ).on( "click", function() {
          $( "#newsDialog" ).dialog( "open" );
        });
      } );
    });
  });


  //footer
  xhr('get',{path:'/footer/'},'#footer').done(function(json){
    $.each(json.social,function(i, item){
      if(i=='title'){
        $('#footer').append('<h1>'+item+'</h1>');
      }else if(i=='tweet'){
        $('#footer').append('<h3>'+item+'</h3>');
      }else if(i=='by'){
        $('#footer').append('<h4>'+item+'</h4>');
      }else if(i=='twitter'){
        $('#footer').append('<a href="'+item+'"><i class="fa fa-3x fa-twitter-square" style="color:white"></i></a>');
      }else if(i=='facebook'){
        $('#footer').append('<a href="'+item+'"><i class="fa fa-3x fa-facebook-square" style="color:white"></i></a>');
      }
    });
  });
  //quick links
  xhr('get',{path:'/footer/'},'#footer1').done(function(json){
    $('#footer1').append('<div id="links"></div>');
    $.each(json.quickLinks,function(i, item){
      $('#links').append('<li><a href="'+item.href+'">'+item.title+'</a></li>');
    });

    //copyright
    $.each(json.copyright,function(i, item){
      if(i=='title'){
        $('#footer1').append('<div id="copyright"><h4>'+item+'</h4></div>');
      }else if(i=='html'){
        $('#copyright').append('<h4>'+item+'</h4>');
      }
    });
  });

});

// tabs plug-in
$( function() {
  $( "#tabs" ).tabs({
    active: 0
  });
} );
function xhr(getPost,d,idForSpinner){
  return $.ajax({
    type: getPost,
    cache: false,
    async: true,
    dataType: 'json',
    data: d,
    url: 'proxy.php',
    beforeSend:function(){
      //create the spinner IF there is a 3rd agr
      //$(idForSpinner).append('<img src="gears.gif" class="dontuse"/>');
    }
  }).always(function(){
    //kill the spinner...
    $(idForSpinner).find('.dontuse').fadeOut(500,function(){
      //kill it
      $(this).remove();
    });
  }).fail(function(err){
    console.log(err);
  });
}
function getAttributesByName(arr, name, val){
  var result=null;
  $.each(arr, function(){
    if(this[name]===val){
      result=this;
    }
  });
  return result;
}

//navigation drop down menu
function dropDown() {
  	if(document.getElementById("myNavigate").style.display == "block"){
		document.getElementById("myNavigate").style.display = "none";
	}else{
		document.getElementById("myNavigate").style.display = "block";
  }
  $('#myNavigate').modal({
    fadeDuration: 100,
  });
}
