

const path = require('path');
const fs = require('fs');

module.exports = function (ctx) {
  const q = ctx.requireCordovaModule('q');

  const deferreds = [];

  // note: https://github.com/phonegap/phonegap-plugin-barcodescanner/issues/233
  deferreds.push((function (deferred) {
    ctx.requireCordovaModule('glob')(
      'phonegap-plugin-barcodescanner/*.gradle',
										 {
											 cwd: path.join(ctx.opts.projectRoot, 'platforms/android'),
											 realpath: true,
										 },
										 (errGlob, files) => {
											 if (errGlob) {
												 return deferred.reject(errGlob);
											 }
											 return q.all(files.map((file) => {
														 var fileDeferred = q.defer();
														 fs.readFile(file, "utf8", function(errRead, fileContent) {
															 if (errRead) {
																 return fileDeferred.reject(errRead);
															 }
															 var matchRegexp = /^ext\.cdvMinSdkVersion\s+=.*/mg;
															 if (!matchRegexp.test(fileContent)) {
																 return fileDeferred.resolve();
															 }
															 return fs.writeFile(file, fileContent.replace(matchRegexp, ""), "utf8", function(errWrite) {
																 if (errWrite) {
																	 return fileDeferred.reject(errWrite);
																 }
																 return fileDeferred.resolve();
															 });
														 });
														 return fileDeferred.promise;
													 }))
													 .then(() => {
														 return deferred.resolve();
													 }, (err) => {
														 return deferred.reject(err);
													 });
										 },
    );
    return deferred.promise;
  })(q.defer()));

  return q.all(deferreds)
    .then(() => ctx);
};
