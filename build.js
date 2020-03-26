//- Turn all Pug Templates into JS for CSR
//----------------------------------------------------------------------------

// var puglatizer = require('puglatizer')

// // Pass in the template directory and what you want to save the output file as
// puglatizer(
// 	__dirname + '/render/main',
// 	__dirname + '/public/templates.js',
// 	// options, // optional
// 	function(err,templates) { 
//     if(!err){console.log('templates compiled')}
//     //console.log(err || 'Successfully compiled') 
//   }
// )

const minify = require('@node-minify/core');
const yui = require('@node-minify/yui');
const uglifyJS = require('@node-minify/uglify-js');
const gcc = require('@node-minify/google-closure-compiler');

minify({
  // compress the custom js files (controller, router global functions)
  // gcc compression usually has some issues with larger libraries
  compressor: gcc,
  options: {
    compilation_level: 'ADVANCED',
    externs: [__dirname+'/build-externs/jquery-3.3.js'],
  },
  input: [
    __dirname+'/public/controller.js'
  ],
  output: __dirname+'/public/controller.min.js',
  type:'js',
  sync:true,
  callback:function(err, value){
    minify({
      // compress the rest of the files
      compressor: uglifyJS,
      input: [
        __dirname+'/public/assets/libs/jquery/dist/jquery.min.js',
        __dirname+'/public/assets/libs/bootstrap/dist/js/bootstrap.bundle.min-1582732176.js',
        __dirname+'/public/assets/libs/qrcodejs/qrcode.min.js',
        __dirname+'/public/assets/libs/jsQR/jsQR.js',
        __dirname+'/public/assets/libs/jsbarcode/script.min.js',
        __dirname+'/public/assets/libs/howler/howler.core.min.js',
        __dirname+'/public/assets/libs/slick/slick.min.js',
        __dirname+'/public/assets/libs/fingerprint/fingerprint2.js',
        __dirname+'/public/assets/libs/imask/dist/imask.min-1582732176.js',
        __dirname+'/public/assets/js/tabler.min-1582732176.js',
        __dirname+'/public/controller.min.js'
      ],
      output: __dirname+'/public/main.min.js',
      type: 'js',
      sync: true,
      callback: function(err, value) {
        if(err){console.log(err)}
        console.log('Javascript Files Concated and Minifed')
        //console.log('sync 2', value);
      }
    });
  }
})


const uglifycss = require('uglifycss');
const uglified = uglifycss.processFiles(
    [
    __dirname+'/public/assets/libs/jqvmap/dist/jqvmap.min-1582732176.css',
    __dirname+'/public/assets/libs/selectize/dist/css/selectize-1582732176.css',
    __dirname+'/public/assets/libs/fullcalendar/core/main.min-1582732176.css',
    __dirname+'/public/assets/libs/fullcalendar/daygrid/main.min-1582732176.css',
    __dirname+'/public/assets/libs/fullcalendar/timegrid/main.min-1582732176.css',
    __dirname+'/public/assets/libs/fullcalendar/list/main.min-1582732176.css',
    __dirname+'/public/assets/libs/flatpickr/dist/flatpickr.min-1582732176.css',
    __dirname+'/public/assets/libs/nouislider/distribute/nouislider.min-1582732176.css',
    __dirname+'/public/assets/libs/mapbox/styles.css',
      //-Zerobase Core
    __dirname+'/public/assets/css/tabler.min-1582732176.css',
    __dirname+'/public/assets/css/icons.css',
      //-Zerobase Plugins
    __dirname+'/public/assets/css/tabler-flags.min-1582732176.css',
    __dirname+'/public/assets/css/tabler-payments.min-1582732176.css',
    __dirname+'/public/assets/css/tabler-buttons.min-1582732176.css',
    __dirname+'/public/assets/css/demo.min-1582732176.css',
    __dirname+'/public/assets/libs/scan-animation/style.css',
    __dirname+'/public/assets/libs/slick/slick.css',
    __dirname+'/public/assets/libs/slick/slick.css',
    __dirname+'/public/assets/libs/slick/slick-theme.css',
    __dirname+'/public/overrides.css',
    ],
    { maxLineLen: 500, expandVars: true }
);

const fs = require('fs');
fs.writeFile(__dirname+"/public/styles.min.css", uglified, function(err) {
    if(err) {return console.log(err)}
    console.log("CSS Files Concated and Minified");
}); 