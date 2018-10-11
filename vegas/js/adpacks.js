var _carbonads = {

	init: function(where, force_serve) 
	{	
		_carbon_legacyid = this.getUrlVar('legacyid');
		
		// this is for legacy adpacks
		if (this.isNum(_carbon_legacyid))
		{
			try{
				var legacycss = document.createElement('style');
					legacycss.id = '_legacy_carbonads_css';
					legacycss.innerHTML = '.one{position:relative}.one .bsa_it_ad{display:block;padding:15px;border:1px solid #e1e1e1;background:#f9f9f9;font-family:helvetica,arial,sans-serif;line-height:100%;position:relative}.one .bsa_it_ad a{text-decoration:none}.one .bsa_it_ad a:hover{text-decoration:none}.one .bsa_it_ad .bsa_it_t{display:block;font-size:12px;font-weight:bold;color:#212121;line-height:125%;padding:0 0 5px 0}.one .bsa_it_ad .bsa_it_d{display:block;color:#434343;font-size:12px;line-height:135%}.one .bsa_it_ad .bsa_it_i{float:left;margin:0 15px 10px 0}body .one .bsa_it_p{text-align:center;display:block !important}.one .bsa_it_p a{font-size:10px;color:#666;text-decoration:none}.one .bsa_it_ad .bsa_it_p a:hover{font-style:italic}';
				document.getElementsByTagName('head')[0].appendChild(legacycss);
			}catch(e){}
		}
		
		_carbon_where = null;
			if(where)
				_carbon_where = where;
			var placement = this.getUrlVar('placement'),
				serve = this.getServe('CKYICKQI', placement),
				baseurl = 'srv.carbonads.net';
			
			// test stuff
			var forcebanner = this.getUrlVar('bsaproforce', window.location.href),
				ignore = this.getUrlVar('bsaprostats', window.location.href),
				forwardedip = this.getUrlVar('bsaforwardedip', window.location.href);
			
			var pro = document.createElement('script');
				pro.id = '_carbonads_projs';
			    pro.type = 'text/javascript';
			    pro.src = '//' + baseurl + '/ads/' + serve + '.json?segment=placement:' + placement + '&callback=_carbonads_go';
			    
			// append test data if we have it
			if (forcebanner)
				pro.src += '&forcebanner=' + forcebanner;
			if (ignore)
				pro.src += '&ignore=' + ignore;
			if (forwardedip)
				pro.src += '&forwardedip=' + forwardedip;
					
			// we check for a freq cap here and if we find one make 
			// the call to the pub pro API with the additional info
			var ck = '';
		    try { ck = decodeURIComponent(document.cookie) } catch (e) {};
			var day = ck.indexOf('_bsap_daycap='),
				life = ck.indexOf('_bsap_lifecap=');
			day = day >= 0 ? ck.substring(day + 12 + 1).split(';')[0].split(',') : [];
			life = life >= 0 ? ck.substring(life + 13 + 1).split(';')[0].split(',') : [];
		
			if (day.length || life.length) {
				var freqcap = [];
				for (var i = 0; i < day.length; i++) {
					var adspot = day[i];
		
					// using an array here is ugly, but safer cross-browser than for(var i in...) from an obj
					for (var found = -1, find = 0; find < freqcap.length && found == -1; find++)
					if (freqcap[find][0] == adspot) found = find;
					if (found == -1) freqcap.push([adspot, 1, 0]);
					else freqcap[found][1]++;
				}
				for (var i = 0; i < life.length; i++) {
					var adspot = day[i];
		
					// using an array here is ugly, but safer cross-browser than for(var i in...) from an obj
					for (var found = -1, find = 0; find < freqcap.length && found == -1; find++)
					if (freqcap[find][0] == adspot) found = find;
					if (found == -1) freqcap.push([adspot, 0, 1]);
					else freqcap[found][2]++;
				}
		
				for (var i = 0; i < freqcap.length; i++)
					freqcap[i] = freqcap[i][0] + ':' + freqcap[i][1] + ',' + freqcap[i][2];
		
				if (freqcap.length) pro.src += '&freqcap=' + encodeURIComponent(freqcap.join(';'));
			}
			
			document.getElementsByTagName('head')[0].appendChild(pro);
	},
	
	getServe: function (serve, placement)
	{

		var r = new Array();
			r['carbonads']='CKYICK7J';
			r['danshippercom']='CKYICKQW';
			r['jmarbachcom']='CKYICKQM';
			r['loneplacebocom']='CKYICKQN';
			r['peternixeycom']='CKYICKQU';
			r['thedailymbacom']='CKYICKQY';
			r['rogerstringercom']='CKYICKQ7';
			r['blogflybaseio']='CKYICKJE';
			r['thenewsprint']='CKYICKJJ';
			r['benrmatthews']='CKYICKJL';
			r['themorningnewsorg']='CKYICKJI';
			r['pxlnv']='CKYICKJW';
			r['asmartbearcom']='CKYICKJM';
			r['kkorgcooltools']='CKYICKJN';
			r['ryrobcom']='CKYICKJU';
			r['kottkeorg']='CKYICKJY';
			r['wwwadrianpelletiercom']='CKYICKJ7';
			r['ritetagcom']='CKYICK7E';
			r['carbonadsnet']='CKYICK7J';
			r['startupgraveyardio']='CKYICK7L';
			r['willrobotstakemyjobcom']='CKYICK7I';
			r['5thirtyonecom']='CKYICK7W';
			r['uxmasterycom']='CKYICK7M';
			r['wwwelezeacom']='CKYICK7N';
			r['uipatternscom']='CKYICK7U';
			r['toolsandtoysnet']='CKYICK7Y';
			r['thaddeushuntcom']='CKYICK77';
			r['shawnblancnet']='CKYIC23E';
			r['ignorethecodenet']='CKYIC23J';
			r['noteandpointcom']='CKYIC23L';
			r['flyositycom']='CKYIC23I';
			r['512pixelsnet']='CKYIC23W';
			r['sachagreifcom']='CKYIC23M';
			r['fortysevenmediacom']='CKYIC23N';
			r['minimallyminimalcom']='CKYIC23U';
			r['minimaldeskscom']='CKYIC23Y';
			r['visualizingeconomicscom']='CKYIC237';
			r['andrewhyde']='CKYIC2QE';
			r['rocketinknet']='CKYIC2QJ';
			r['katiefloydme']='CKYIC2QL';
			r['tweepsectcom']='CKYIC2QI';
			r['asymcocom']='CKYIC2QW';
			r['myfaves']='CKYIC2QM';
			r['tommasonervegnacom']='CKYIC2QN';
			r['techinchcom']='CKYIC2QU';
			r['timolivercomau']='CKYIC2QY';
			r['stuarthall']='CKYIC2Q7';
			r['rsio']='CKYIC2JE';
			r['allenpike']='CKYIC2JJ';
			r['initialchargenet']='CKYIC2JL';
			r['sayzlimnet']='CKYIC2JI';
			r['schwarztechnet']='CKYIC2JW';
			r['worktimercouk']='CKYIC2JM';
			r['www6ixpassionscom']='CKYIC2JN';
			r['wwwtech-thoughtsnet']='CKYIC2JU';
			r['beautifulpixels']='CKYIC2JY';
			r['ideaswatchcom']='CKYIC2J7';
			r['benedictevans']='CKYIC27E';
			r['workfromco']='CKYIC27J';
			r['usabilitycountscom']='CKYIC27L';
			r['whohuntio']='CKYIC27I';
			r['thetaoofmaccombiz']='CKYIC27W';
			r['ferossorgbiz']='CKYIC27M';
			r['kevgriffincombiz']='CKYIC27N';
			r['tosbournbiz']='CKYIC27U';
			r['daverupertcombiz']='CKYIC27Y';
			r['brettterpstrabiz']='CKYIC277';
			r['mjtsaicom']='CKYIC53E';
			r['degoesnet']='CKYIC53J';
			r['macgasmnet']='CKYIC53L';
			r['jeremyaboydcom']='CKYIC53I';
			r['davidaireycom']='CKYIC53W';
			r['besttechiecom']='CKYIC53M';
			r['wfhio']='CKYIC53N';
			r['remotelyawesomejobscom']='CKYIC53U';
			r['morningreadercom']='CKYIC53Y';
			r['joebuhligcom']='CKYIC537';
			r['zachholmancom']='CKYIC5QE';
			r['speakingio']='CKYIC5QJ';
			r['birchtreeme']='CKYIC5QL';
			r['tomatotimercom']='CKYIC5QI';
			r['kontaktifycom']='CKYIC5QW';
			r['loopinsightcom']='CKYIC5QM';
			r['sixcolorscom']='CKYIC5QN';
			r['signature']='CKYIC5QU';
			r['listennotescom']='CKYIC5QY';
			r['funretrogithubio']='CKYIC5Q7';
			r['pg2epubcom']='CKYIVK3E';
			r['pomodorotrackercom']='CKYIVK3J';
			r['brightlycoloredorg']='CKYIVK3L';
			r['chrishannahme']='CKYIVK3I';
			r['kubadownloadcom']='CKYIVK3W';
			r['thekidshouldseethiscom']='CKYIVK3M';
			r['downforeveryoneorjustmecom']='CKYIVK3N';
			r['dontbreakthechaincom']='CKYIVK3U';
			r['thedigitalprojectmanagercom']='CKYIVK3Y';
			r['mclearcouk']='CKYIVK37';
			r['buildingthefutureshowcom']='CKYIVKQE';
			r['getcronocom']='CKYIVKQJ';
			r['formvalidatornet']='CKYIVKQL';
			r['lovelystationerycom']='CKYIVKQI';
			r['danielmallcom']='CKYIVKQW';
			r['unmatchedstylecom']='CKYIVKQM';
			r['poolgacom']='CKYIVKQN';
			r['matthewbuchananname']='CKYIVKQU';
			r['cmybaconcom']='CKYIVKQY';
			r['blogsignalnoisecom']='CKYIVKQ7';
			r['justcreativecom']='CKYIVKJE';
			r['bestaboutpagescom']='CKYIVKJJ';
			r['wordmarkit']='CKYIVKJL';
			r['iconmonstrcom']='CKYIVKJI';
			r['thecleverestcom']='CKYIVKJW';
			r['toddmottocom']='CKYIVKJM';
			r['bestagencysitescom']='CKYIVKJN';
			r['bestproductsitescom']='CKYIVKJU';
			r['typiconscom']='CKYIVKJY';
			r['reeoocom']='CKYIVKJ7';
			r['uispacenet']='CKYIVK7E';
			r['onepagemaniacom']='CKYIVK7J';
			r['typezebracom']='CKYIVK7L';
			r['sketchappsourcescom']='CKYIVK7I';
			r['identitydesignedcom']='CKYIVK7W';
			r['logodesignlovecom']='CKYIVK7M';
			r['idpinthatcom']='CKYIVK7N';
			r['creativerootsorg']='CKYIVK7U';
			r['styleboostcom']='CKYIVK7Y';
			r['theinspirationgridcom']='CKYIVK77';
			r['alessioatzenicom']='CKYIV23E';
			r['verynicesitescom']='CKYIV23J';
			r['bpandoorg']='CKYIV23L';
			r['bestfolioscom']='CKYIV23I';
			r['pexels']='CKYIV23W';
			r['dropr']='CKYIV23M';
			r['birmenet']='CKYIV23N';
			r['paymentfontio']='CKYIV23U';
			r['stocksnapio']='CKYIV23Y';
			r['thezinxcom']='CKYIV237';
			r['logobookcom']='CKYIV2QE';
			r['magdeleine']='CKYIV2QJ';
			r['clrscc']='CKYIV2QL';
			r['fontpairco']='CKYIV2QI';
			r['typeverything']='CKYIV2QW';
			r['lapaninja']='CKYIV2QM';
			r['swissmisscom']='CKYIV2QN';
			r['modularscalecom']='CKYIV2QU';
			r['prototyprio']='CKYIV2QY';
			r['compfightcom']='CKYIV2Q7';
			r['wwwvectorgraphitcom']='CKYIV2JE';
			r['web3canvascom']='CKYIV2JJ';
			r['mobilepatternscom']='CKYIV2JL';
			r['freebiesboothcom']='CKYIV2JI';
			r['typescalecom']='CKYIV2JW';
			r['mindsparklemagcom']='CKYIV2JM';
			r['museresourcescom']='CKYIV2JN';
			r['wwwcomicsanscriminalcom']='CKYIV2JU';
			r['brandcolorsnet']='CKYIV2JY';
			r['www404notfoundfr']='CKYIV2J7';
			r['wwwiainclaridgecouk']='CKYIV27E';
			r['newoldstock']='CKYIV27J';
			r['originalmockups']='CKYIV27L';
			r['icons8com']='CKYIV27I';
			r['colormindio']='CKYIV27W';
			r['wwwusabilitypostcom']='CKYIV27M';
			r['houseofbuttonstumblrcom']='CKYIV27N';
			r['wwwwireframeshowcasecom']='CKYIV27U';
			r['wwwuiparadecom']='CKYIV27Y';
			r['thehipperelement']='CKYIV277';
			r['homescreenme']='CKYIV53E';
			r['maxvoltarcom']='CKYIV53J';
			r['idsgnorg']='CKYIV53L';
			r['simpledesktopscom']='CKYIV53I';
			r['aisleonenet']='CKYIV53W';
			r['wankencom']='CKYIV53M';
			r['methodandcraftcom']='CKYIV53N';
			r['rohdesigncom']='CKYIV53U';
			r['abduzeedocom']='CKYIV53Y';
			r['nicewebtypecom']='CKYIV537';
			r['bradfrostwebcom']='CKYIV5QE';
			r['ivomynttinencom']='CKYIV5QJ';
			r['gedblogcom']='CKYIV5QL';
			r['appitizeus']='CKYIV5QI';
			r['learnsketch']='CKYIV5QW';
			r['fontawesome']='CKYIV5QM';
			r['perfectpixel']='CKYIV5QN';
			r['freebiesbugcom']='CKYIV5QU';
			r['endlessiconscom']='CKYIV5QY';
			r['iosicongallerycom']='CKYIV5Q7';
			r['ui-cloudcom']='CKYIPK3E';
			r['wwwsiiimplecom']='CKYIPK3J';
			r['designerlynxco']='CKYIPK3L';
			r['iconbroscom']='CKYIPK3I';
			r['everyinteractioncom']='CKYIPK3W';
			r['graineditcom']='CKYIPK3M';
			r['admiretheweb']='CKYIPK3N';
			r['startupstockphotoscom']='CKYIPK3U';
			r['cymbolismcom']='CKYIPK3Y';
			r['realisticshots']='CKYIPK37';
			r['findaphoto']='CKYIPKQE';
			r['fltdsgncom']='CKYIPKQJ';
			r['slipprycom']='CKYIPKQL';
			r['mrmrsio']='CKYIPKQI';
			r['minimalstuffcom']='CKYIPKQW';
			r['jxnblkcom']='CKYIPKQM';
			r['basscsscom']='CKYIPKQN';
			r['makerbooknet']='CKYIPKQU';
			r['fillerama']='CKYIPKQY';
			r['html5zerocom']='CKYIPKQ7';
			r['designideaspics']='CKYIPKJE';
			r['inspirationmobiletumblrcom']='CKYIPKJJ';
			r['ifontyoucom']='CKYIPKJL';
			r['kuulaco']='CKYIPKJI';
			r['materialdesigniconscom']='CKYIPKJW';
			r['0to255com']='CKYIPKJM';
			r['spottheunsubscribetumblrcom']='CKYIPKJN';
			r['baconipsumcom']='CKYIPKJU';
			r['sketchshortcutscom']='CKYIPKJY';
			r['cubicbeziercom']='CKYIPKJ7';
			r['wwwhereio']='CKYIPK7E';
			r['navnavco']='CKYIPK7J';
			r['perfectpixelfirefox']='CKYIPK7L';
			r['fa2pngio']='CKYIPK7I';
			r['uimovementcom']='CKYIPK7W';
			r['simpleiconsorg']='CKYIPK7M';
			r['dpilv']='CKYIPK7N';
			r['revisionpathcom']='CKYIPK7U';
			r['designermillcom']='CKYIPK7Y';
			r['uigaragenet']='CKYIPK77';
			r['freeiconshopcom']='CKYIP23E';
			r['logospirecom']='CKYIP23J';
			r['mockuuupscom']='CKYIP23L';
			r['instantlogosearchcom']='CKYIP23I';
			r['sketchsheetscom']='CKYIP23W';
			r['worldvectorlogocom']='CKYIP23M';
			r['icanbecreativecom']='CKYIP23N';
			r['grfxprocom']='CKYIP23U';
			r['inspirationuicom']='CKYIP23Y';
			r['wowwebcouk']='CKYIP237';
			r['designernewsco']='CKYIP2QE';
			r['landingfoliocom']='CKYIP2QJ';
			r['colordropio']='CKYIP2QL';
			r['resourcecardscom']='CKYIP2QI';
			r['sansfrancisco']='CKYIP2QW';
			r['landbookcom']='CKYIP2QM';
			r['nicelydoneclub']='CKYIP2QN';
			r['hypershootcom']='CKYIP2QU';
			r['uidbio']='CKYIP2QY';
			r['flatuicolorpickercom']='CKYIP2Q7';
			r['sketchapprocks']='CKYIP2JE';
			r['ffcuio']='CKYIP2JJ';
			r['hipsteripsumme']='CKYIP2JL';
			r['usepandacomdesign']='CKYIP2JI';
			r['freeforcommercialusenet']='CKYIP2JW';
			r['wedistillio']='CKYIP2JM';
			r['dribbble']='CKYIP2JN';
			r['songg']='CKYIP2JU';
			r['designerdadacom']='CKYIP2JY';
			r['thebrandidentitycom']='CKYIP2J7';
			r['sketchpackscom']='CKYIP27E';
			r['joshuagintercom']='CKYIP27J';
			r['iconscoutcom']='CKYIP27L';
			r['colorhuntco']='CKYIP27I';
			r['hipstheticcom']='CKYIP27W';
			r['myfontscom']='CKYIP27M';
			r['imageglassorg']='CKYIP27N';
			r['500pxcom']='CKYIP27U';
			r['uijarcom']='CKYIP27Y';
			r['uiresourcescom']='CKYIP277';
			r['startbootstrapcom']='CKYIP53E';
			r['twinefm']='CKYIP53J';
			r['danielgynncom']='CKYIP53L';
			r['principlesdesign']='CKYIP53I';
			r['gradientscssgearscom']='CKYIP53W';
			r['zerostagramcom']='CKYIP53M';
			r['cybrhomecomdesign']='CKYIP53N';
			r['wefunctioncom']='CKYIP53U';
			r['underbiteco']='CKYIP53Y';
			r['fontsinusecom']='CKYIP537';
			r['linotypecom']='CKYIP5QE';
			r['fontscom']='CKYIP5QJ';
			r['openprocessingorg']='CKYIP5QL';
			r['iconfindercom']='CKYIP5QI';
			r['uplabscom']='CKYIP5QW';
			r['qansercom']='CKYIP5QM';
			r['fontshopcom']='CKYIP5QN';
			r['khromaco']='CKYIP5QU';
			r['craftloopnet']='CKYIP5QY';
			r['klikkenthekecom']='CKYIP5Q7';
			r['smpetreycom']='CKYIKK3E';
			r['brutalistwebsitescom']='CKYIKK3J';
			r['perfectionkillscom']='CKYIKK3L';
			r['eclipsecolorthemesorg']='CKYIKK3I';
			r['letteringjscom']='CKYIKK3W';
			r['morethansevennet']='CKYIKK3M';
			r['onethingwellorg']='CKYIKK3N';
			r['wildlyinaccuratecom']='CKYIKK3U';
			r['blogjoelambertcouk']='CKYIKK3Y';
			r['chrispederickcom']='CKYIKK37';
			r['bluepiccadillycom']='CKYIKKQE';
			r['html5demoscom']='CKYIKKQJ';
			r['charlesproxycom']='CKYIKKQL';
			r['jeffkreeftmeijercom']='CKYIKKQI';
			r['cssflowcom']='CKYIKKQW';
			r['slexyorg']='CKYIKKQM';
			r['rubydocorg']='CKYIKKQN';
			r['charlieparkorgbootstrapbuttons']='CKYIKKQU';
			r['hugogiraudelcom']='CKYIKKQY';
			r['expogetbootstrapcom']='CKYIKKQ7';
			r['darsain']='CKYIKKJE';
			r['bloggetbootstrapcom']='CKYIKKJJ';
			r['getbootstrapcom']='CKYIKKJL';
			r['plnkrco']='CKYIKKJI';
			r['bootplycom']='CKYIKKJW';
			r['taybenlorcom']='CKYIKKJM';
			r['forumsanchorcmscom']='CKYIKKJN';
			r['markgoodyearcom']='CKYIKKJU';
			r['browserhackscom']='CKYIKKJY';
			r['responsivenavigationnet']='CKYIKKJ7';
			r['brunoscopelliticom']='CKYIKK7E';
			r['emmetio']='CKYIKK7J';
			r['jquerystepscom']='CKYIKK7L';
			r['silviomoretogithubiobootstrapsel']='CKYIKK7I';
			r['listjscom']='CKYIKK7W';
			r['semanticuicom']='CKYIKK7M';
			r['getfireshellcom']='CKYIKK7N';
			r['tnycz']='CKYIKK7U';
			r['numeraljscom']='CKYIKK7Y';
			r['thinkandbuildit']='CKYIKK77';
			r['simonholywellcom']='CKYIK23E';
			r['phalconphpcom']='CKYIK23J';
			r['blogcodinghorrorcom']='CKYIK23L';
			r['mapstylrcom']='CKYIK23I';
			r['astronautwebco']='CKYIK23W';
			r['nviecom']='CKYIK23M';
			r['samaxescom']='CKYIK23N';
			r['devblogavdiorg']='CKYIK23U';
			r['meanthemescom']='CKYIK23Y';
			r['philgrcom']='CKYIK237';
			r['codyhouseco']='CKYIK2QE';
			r['codyhousecov2']='CKYIK2QE';
			r['goratchetcom']='CKYIK2QJ';
			r['ghussegithubiojqrangeslider']='CKYIK2QL';
			r['givengoco']='CKYIK2QI';
			r['jquerycreditcardvalidator']='CKYIK2QW';
			r['responsivebp']='CKYIK2QM';
			r['pastebincarbon']='CKYIK2QN';
			r['pastebincom-fixed']='CK7DT2JY';
			r['pastebinus']='CK7DT2JU';
			r['vuejs']='CKYIK2QU';
			r['gitignoreio']='CKYIK2QY';
			r['codesynthesis']='CKYIK2Q7';
			r['scoopthemes']='CKYIK2JE';
			r['veerleduohcom']='CKYIK2JJ';
			r['jasonwatmore']='CKYIK2JL';
			r['anchorcms']='CKYIK2JI';
			r['scotchio']='CKYIK2JW';
			r['coolx10com']='CKYIK2JM';
			r['sassmeister']='CKYIK2JN';
			r['cssreferenceio']='CKYIK2JU';
			r['jquerybootgrid']='CKYIK2JY';
			r['interactjsio']='CKYIK2J7';
			r['freestackcouk']='CKYIK27E';
			r['materializecss']='CKYIK27J';
			r['devhubio']='CKYIK27L';
			r['qnimate']='CKYIK27I';
			r['typeplatecom']='CKYIK27W';
			r['fittextjscom']='CKYIK27M';
			r['elrumordelaluzgithubiocsshake']='CKYIK27N';
			r['murzebe']='CKYIK27U';
			r['jonsuh']='CKYIK27Y';
			r['jansy']='CKYIK277';
			r['cdnjscom']='CKYIK53E';
			r['designbytypingcom']='CKYIK53J';
			r['cssguidelines']='CKYIK53L';
			r['codrops']='CKYIK53I';
			r['saeedalipoorgithubioicono']='CKYIK53W';
			r['benmccormickorg']='CKYIK53M';
			r['colorzillacom']='CKYIK53N';
			r['css3clickchartcom']='CKYIK53U';
			r['speakingjscom']='CKYIK53Y';
			r['thecssninjacom']='CKYIK537';
			r['rdrrio']='CKYIK5QE';
			r['fancyboxnet']='CKYIK5QJ';
			r['eggtimercom']='CKYIK5QL';
			r['csswizardrycom']='CKYIK5QI';
			r['cssglobecom']='CKYIK5QW';
			r['tutorialzinecom']='CKYIK5QM';
			r['leaveroume']='CKYIK5QN';
			r['css3generatorcom']='CKYIK5QU';
			r['ejohnorg']='CKYIK5QY';
			r['dummyimagecom']='CKYIK5Q7';
			r['pythonrequestsorg']='CKYI5K3E';
			r['mediaqueries']='CKYI5K3J';
			r['wwwgrocerycrudcom']='CKYI5K3L';
			r['isituporg']='CKYI5K3I';
			r['gitguide']='CKYI5K3W';
			r['pythonguideorg']='CKYI5K3M';
			r['webdesignandsuchcom']='CKYI5K3N';
			r['jackrugilecom']='CKYI5K3U';
			r['thecodebarbariancom']='CKYI5K3Y';
			r['animistanet']='CKYI5K37';
			r['codularcom']='CKYI5KQE';
			r['iwantaneffin']='CKYI5KQJ';
			r['davidwalshname']='CKYI5KQL';
			r['2alitycom']='CKYI5KQI';
			r['tjvantollcom']='CKYI5KQW';
			r['jsternet']='CKYI5KQM';
			r['phaserio']='CKYI5KQN';
			r['greasyforkorg']='CKYI5KQU';
			r['vuetifyjscom']='CKYI5KQY';
			r['cssmenumakercom']='CKYI5KQ7';
			r['wwwthepetedesigncom']='CKYI5KJE';
			r['techstreamorg']='CKYI5KJJ';
			r['cubiqorg']='CKYI5KJL';
			r['onlinegdbcom']='CKYI5KJI';
			r['githubcombevacqua']='CKYI5KJW';
			r['vuejsfeedcom']='CKYI5KJM';
			r['anthonyterrien']='CKYI5KJN';
			r['grapesjscom']='CKYI5KJU';
			r['bootflat']='CKYI5KJY';
			r['codepen']='CKYI5KJ7';
			r['ryanchristiani']='CKYI5K7E';
			r['loadingio']='CKYI5K7J';
			r['ayanaio']='CKYI5K7L';
			r['blivesta']='CKYI5K7I';
			r['madewitharkitcom']='CKYI5K7W';
			r['jaysalvatcom']='CKYI5K7M';
			r['fredboatcom']='CKYI5K7N';
			r['glebbahmutovcom']='CKYI5K7U';
			r['wwwfontfacecom']='CKYI5K7Y';
			r['osvaldasinfo']='CKYI5K77';
			r['cultttcom']='CKYI523E';
			r['stuartbreckenridgecom']='CKYI523J';
			r['snakifyorg']='CKYI523L';
			r['wwwjankoatwarpspeedcom']='CKYI523I';
			r['howoldistheinternet']='CKYI523W';
			r['passportjsorg']='CKYI523M';
			r['hacktheboxeu']='CKYI523N';
			r['getwirefycom']='CKYI523U';
			r['960gs']='CKYI523Y';
			r['formalizeme']='CKYI5237';
			r['unsemanticcom']='CKYI52QE';
			r['noahstokescom']='CKYI52QJ';
			r['botmanio']='CKYI52QL';
			r['sonspringcom']='CKYI52QI';
			r['hackrio']='CKYI52QW';
			r['trentwaltoncom']='CKYI52QM';
			r['thesasswaycom']='CKYI52QN';
			r['markdottocom']='CKYI52QU';
			r['compassstyleorg']='CKYI52QY';
			r['peterbecom']='CKYI52Q7';
			r['hiltmoncom']='CKYI52JE';
			r['mouappcom']='CKYI52JJ';
			r['onextrapixelcom']='CKYI52JL';
			r['leemunroecom']='CKYI52JI';
			r['themainthreadcom']='CKYI52JW';
			r['thegridsystemnet']='CKYI52JM';
			r['botpvpcraftca']='CKYI52JN';
			r['codeguide']='CKYI52JU';
			r['wtfhtmlcss']='CKYI52JY';
			r['callmenickcom']='CKYI52J7';
			r['wtfforms']='CKYI527E';
			r['learninglaravel']='CKYI527J';
			r['zerosixthree']='CKYI527L';
			r['jessepollak']='CKYI527I';
			r['concisecss']='CKYI527W';
			r['grayghostvisuals']='CKYI527M';
			r['robandlaurencom']='CKYI527N';
			r['slipsumcom']='CKYI527U';
			r['bxslidercom']='CKYI527Y';
			r['pastiebincom']='CKYI5277';
			r['joomlaorg']='CKYI553E';
			r['mindthecode']='CKYI553J';
			r['ponyfoocom']='CKYI553L';
			r['pushjsorg']='CKYI553I';
			r['js2coffee']='CKYI553W';
			r['revealjscom']='CKYI553M';
			r['fezvrastagithubiobootstrapmateri']='CKYI553N';
			r['htmlreferenceio']='CKYI553U';
			r['winterbecom']='CKYI553Y';
			r['betterspecsorg']='CKYI5537';
			r['papermashupcom']='CKYI55QE';
			r['alertifyjs']='CKYI55QJ';
			r['kenwheelergithubio']='CKYI55QL';
			r['gitterim']='CKYI55QI';
			r['projectslukehaasmecssloaders']='CKYI55QW';
			r['webdesignrepocom']='CKYI55QM';
			r['rvmio']='CKYI55QN';
			r['gumbyframeworkcom']='CKYI55QU';
			r['lavaliteorg']='CKYI55QY';
			r['fengyuanchen']='CKYI55Q7';
			r['editorcodnexnet']='CKYIEK3E';
			r['phpcodecheckercom']='CKYIEK3J';
			r['codeplycom']='CKYIEK3L';
			r['codingislovecom']='CKYIEK3I';
			r['w3bincom']='CKYIEK3W';
			r['garronme']='CKYIEK3M';
			r['jblevinsorg']='CKYIEK3N';
			r['fortranwikiorg']='CKYIEK3U';
			r['nczonlinenet']='CKYIEK3Y';
			r['lodashcom']='CKYIEK37';
			r['searchcodecom']='CKYIEKQE';
			r['matrixmultiplicationxyz']='CKYIEKQJ';
			r['exploringjscom']='CKYIEKQL';
			r['blogeppzeu']='CKYIEKQI';
			r['icanbeacodercom']='CKYIEKQW';
			r['simpleisbetterthancomplexcom']='CKYIEKQM';
			r['tobiasahlincom']='CKYIEKQN';
			r['prismjscom']='CKYIEKQU';
			r['colintohcom']='CKYIEKQY';
			r['jsfiddlenet']='CKYIEKQ7';
			r['transformiconscom']='CKYIEKJE';
			r['deckofcardsjsorg']='CKYIEKJJ';
			r['sahatyalkabovcom']='CKYIEKJL';
			r['drupal']='CKYIEKJI';
			r['codemyuicom']='CKYIEKJW';
			r['hiliosgithubiojQuerycountdown']='CKYIEKJM';
			r['jsperfcom']='CKYIEKJN';
			r['frontendfrontcom']='CKYIEKJU';
			r['jsbincom']='CKYIEKJY';
			r['thomashuntername']='CKYIEKJ7';
			r['fabricjscom']='CKYIEK7E';
			r['codedailyio']='CKYIEK7J';
			r['diffcheckercom']='CKYIEK7L';
			r['instafeedjscom']='CKYIEK7I';
			r['littlesnippetsnet']='CKYIEK7W';
			r['javascriptplaygroundcom']='CKYIEK7M';
			r['plotly']='CKYIEK7N';
			r['css3testcom']='CKYIEK7U';
			r['720kbgithubio']='CKYIEK7Y';
			r['jaredreichcom']='CKYIEK77';
			r['eekro']='CKYIE23E';
			r['milligramgithubio']='CKYIE23J';
			r['jscoach']='CKYIE23L';
			r['jquerycardscom']='CKYIE23I';
			r['ianlunngithubiohover']='CKYIE23W';
			r['ianlunncouk']='CKYIE23M';
			r['bootswatchcom']='CKYIE23N';
			r['themes3rdwavemediacom']='CKYIE23U';
			r['emmetreview']='CKYIE23Y';
			r['wavesurfer-jsorg']='CKYIE237';
			r['js-gridcom']='CKYIE2QE';
			r['paulundcouk']='CKYIE2QJ';
			r['lmgonzalvesgithubio']='CKYIE2QL';
			r['krasimirtsonevcom']='CKYIE2QI';
			r['fezvrastagithubiopopperjs']='CKYIE2QW';
			r['sequencejscom']='CKYIE2QM';
			r['bulmaio']='CKYIE2QN';
			r['tachyonsio']='CKYIE2QU';
			r['catalinred']='CKYIE2QY';
			r['iconogencom']='CKYIE2Q7';
			r['sequelprocom']='CKYIE2JE';
			r['bse64com']='CKYIE2JJ';
			r['jsondataninja']='CKYIE2JL';
			r['jssocialscom']='CKYIE2JI';
			r['libhuntcom']='CKYIE2JW';
			r['glotio']='CKYIE2JM';
			r['madewithangularcom']='CKYIE2JN';
			r['megaboilerplatecom']='CKYIE2JU';
			r['benfraincom']='CKYIE2JY';
			r['lukyvjgithubiofamilyscss']='CKYIE2J7';
			r['kodhuscom']='CKYIE27E';
			r['phpiedcom']='CKYIE27J';
			r['perfplanetcom']='CKYIE27L';
			r['jspatternscom']='CKYIE27I';
			r['bookofspeedcom']='CKYIE27W';
			r['kyusufcom']='CKYIE27M';
			r['drushcommandscom']='CKYIE27N';
			r['nodemailercom']='CKYIE27U';
			r['coolphptoolscom']='CKYIE27Y';
			r['pocooorg']='CKYIE277';
			r['rtlcsscom']='CKYIE53E';
			r['marksheetio']='CKYIE53J';
			r['timepickerco']='CKYIE53L';
			r['notepadplusplusorg']='CKYIE53I';
			r['zealdocsorg']='CKYIE53W';
			r['zealdocsforwindowsorg']='CKYIE53M';
			r['clusterizejsorg']='CKYIE53N';
			r['lostechiescom']='CKYIE53U';
			r['abuseipdbcomjw']='CKYIE53Y';
			r['oauthnet']='CKYIE537';
			r['idangerousswiper']='CKYIE5QE';
			r['framework7io']='CKYIE5QJ';
			r['monkberryjsorg']='CKYIE5QL';
			r['deployerorg']='CKYIE5QI';
			r['beautifytoolscom']='CKYIE5QW';
			r['1000hzgithubio']='CKYIE5QM';
			r['vimgifscom']='CKYIE5QN';
			r['craftedinco']='CKYIE5QU';
			r['formstoneit']='CKYIE5QY';
			r['devpyme']='CKYIE5Q7';
			r['laravelcom']='CKYILK3E';
			r['symfonycom']='CKYILK3J';
			r['codewarscom']='CKYILK3L';
			r['syntaxdbcom']='CKYILK3I';
			r['aaronpareckicom']='CKYILK3W';
			r['nightwatchjsorg']='CKYILK3M';
			r['flexboxgridcom']='CKYILK3N';
			r['gogsio']='CKYILK3U';
			r['programmingzencom']='CKYILK3Y';
			r['thinksterio']='CKYILK37';
			r['adamschwartzco']='CKYILKQE';
			r['sweetalert2githubio']='CKYILKQJ';
			r['cryptiicom']='CKYILKQL';
			r['hookrio']='CKYILKQI';
			r['cssnextio']='CKYILKQW';
			r['echolabstackcom']='CKYILKQM';
			r['slicknavcom']='CKYILKQN';
			r['esdiscussorg']='CKYILKQU';
			r['promisejsorg']='CKYILKQY';
			r['pugjsorg']='CKYILKQ7';
			r['jscrollcom']='CKYILKJE';
			r['blogphilipphauerde']='CKYILKJJ';
			r['learnshayhowecom']='CKYILKJL';
			r['bootdeycom']='CKYILKJI';
			r['glyphsearchcom']='CKYILKJW';
			r['chriswhartonme']='CKYILKJM';
			r['reacttoolboxcom']='CKYILKJN';
			r['williambrownstreetnet']='CKYILKJU';
			r['understrapcom']='CKYILKJY';
			r['coryrylancom']='CKYILKJ7';
			r['bitshadowgithubio']='CKYILK7E';
			r['importpythoncom']='CKYILK7J';
			r['rextestercom']='CKYILK7L';
			r['responsivedesignis']='CKYILK7I';
			r['weavertips']='CKYILK7W';
			r['justmarkupcom']='CKYILK7M';
			r['hiredintechcom']='CKYILK7N';
			r['nuxtjsorg']='CKYILK7U';
			r['sqlalchemyorg']='CKYILK7Y';
			r['laracastscom']='CKYILK77';
			r['jonrohancodes']='CKYIL23E';
			r['ellieappcom']='CKYIL23J';
			r['bitsofcode']='CKYIL23L';
			r['adonisjscom']='CKYIL23I';
			r['alembiczzzcomputingcom']='CKYIL23W';
			r['dynobotnet']='CKYIL23M';
			r['mattcromwellcom']='CKYIL23N';
			r['devdojocom']='CKYIL23U';
			r['hackcsscom']='CKYIL23Y';
			r['intento']='CKYIL237';
			r['aarongustafsoncom']='CKYIL2QE';
			r['gitdvcscom']='CKYIL2QJ';
			r['bootstrapcdncom']='CKYIL2QL';
			r['kboboxthemescom']='CKYIL2QI';
			r['vuematerialio']='CKYIL2QW';
			r['recalllco']='CKYIL2QM';
			r['nedimnoty']='CKYIL2QN';
			r['hexoio']='CKYIL2QU';
			r['angularfirebasecom']='CKYIL2QY';
			r['sailsjsorg']='CKYIL2Q7';
			r['crowdforgeio']='CKYIL2JE';
			r['iosblogcouk']='CKYIL2JJ';
			r['html2canvashertzencom']='CKYIL2JL';
			r['dbaderorg']='CKYIL2JI';
			r['mattwarrenorg']='CKYIL2JW';
			r['imagehoverio']='CKYIL2JM';
			r['vuejsdeveloperscom']='CKYIL2JN';
			r['lottiefilescom']='CKYIL2JU';
			r['riggaroocoza']='CKYIL2JY';
			r['baeldungcom']='CKYIL2J7';
			r['funretrospectivescom']='CKYIL27E';
			r['splitsio']='CKYIL27J';
			r['materialuicom']='CKYIL27L';
			r['mongoosejscom']='CKYIL27I';
			r['blazecsscom']='CKYIL27W';
			r['getgravorg']='CKYIL27M';
			r['bennettfeelycom']='CKYIL27N';
			r['perfectpixelopera']='CKYIL27U';
			r['perfectpixeledge']='CKYIL27Y';
			r['perfectpixelsafari']='CKYIL277';
			r['codesandboxio']='CKYIL53E';
			r['gijsrogegithubio']='CKYIL53J';
			r['csvjsoncom']='CKYIL53L';
			r['kazzkiqgithubio']='CKYIL53I';
			r['octoprintorg']='CKYIL53W';
			r['blueimpgithubio']='CKYIL53M';
			r['socketio']='CKYIL53N';
			r['frontendtoolscom']='CKYIL53U';
			r['madewithvuejscom']='CKYIL53Y';
			r['getheadinfo']='CKYIL537';
			r['readerone']='CKYIL5QE';
			r['botsfloorcom']='CKYIL5QJ';
			r['reactrocks']='CKYIL5QL';
			r['saedsayadcom']='CKYIL5QI';
			r['muicsscom']='CKYIL5QW';
			r['laravelzerocom']='CKYIL5QM';
			r['publiclyio']='CKYIL5QN';
			r['reactparts']='CKYIL5QU';
			r['mockitoorg']='CKYIL5QY';
			r['deanattalicom']='CKYIL5Q7';
			r['tailwindcsscom']='CK7DTK3E';
			r['oxequacom']='CK7DTK3J';
			r['haackedcom']='CK7DTK3L';
			r['hacksourcexyz']='CK7DTK3I';
			r['githowtocom']='CK7DTK3W';
			r['stacknl']='CK7DTK3M';
			r['listcommunity']='CK7DTK3N';
			r['hildebertocom']='CK7DTK3U';
			r['madewithlaravelcom']='CK7DTK3Y';
			r['codetimeio']='CK7DTK37';
			r['ohshitgitcom']='CK7DTKQE';
			r['discordserverscom']='CK7DTKQJ';
			r['philnash']='CK7DTKQL';
			r['aspectratio']='CK7DTKQI';
			r['picturepan2githubio']='CK7DTKQW';
			r['sujipthapaco']='CK7DTKQM';
			r['javascriptreportcom']='CK7DTKQN';
			r['learnappmakingcom']='CK7DTKQU';
			r['lobotuertocom']='CK7DTKQY';
			r['adrenalinchartscom']='CK7DTKQ7';
			r['adammarsdencouk']='CK7DTKJE';
			r['sourcemakingcom']='CK7DTKJJ';
			r['reasonmlhubcom']='CK7DTKJL';
			r['getshuttlexyz']='CK7DTKJI';
			r['tinypngcom']='CK7DTKJW';
			r['materialpalettecom']='CK7DTKJM';
			r['davepaquettecom']='CK7DTKJN';
			r['sqlfiddlecom']='CK7DTKJU';
			r['gormio']='CK7DTKJY';
			r['authnuxtjsorg']='CK7DTKJ7';
			r['pwanuxtjsorg']='CK7DTK7E';
			r['axiosnuxtjsorg']='CK7DTK7J';
			r['hakaselogsme']='CK7DTK7L';
			r['projectboardxyz']='CK7DTK7I';
			r['polrprojectorg']='CK7DTK7W';
			r['beauteroutboxcraftcom']='CK7DTK7M';
			r['fonoapifreshpixlcom']='CK7DTK7N';
			r['plainjscom']='CK7DTK7U';
			r['qrohlfcom']='CK7DTK7Y';
			r['transformnowsh']='CK7DTK77';
			r['leighhallidaycom']='CK7DT23E';
			r['reactsemanticuicom']='CK7DT23J';
			r['whatwebcandotoday']='CK7DT23L';
			r['materialthemecom']='CK7DT23I';
			r['colorzillacomgradienteditor']='CK7DT23W';
			r['jgthmscom']='CK7DT23M';
			r['larastreamcom']='CK7DT23N';
			r['easyphporg']='CK7DT23U';
			r['codecrafttv']='CK7DT23Y';
			r['pluginsoctoprintorg']='CK7DT237';
			r['discourseoctoprintorg']='CK7DT2QE';
			r['contrastratiocom']='CK7DT2QJ';
			r['blogtdwrightcouk']='CK7DT2QL';
			r['payloadjscom']='CK7DT2QI';
			r['vaporcodes']='CK7DT2QW';
			r['dailynowco']='CK7DT2QM';
			r['csharp2jsonio']='CK7DT2QN';
			r['boostlogio']='CK7DT2QU';
			r['grafiteca']='CK7DT2QY';
			r['cmtyio']='CK7DT2Q7';
			r['flysystemthephpleaguecom']='CK7DT2JE';
			r['www404notfoundfr']='CKYIV2J7';
			r['aisleonenet']='CKYIV53W';
			r['alessioatzenicom']='CKYIV23E';
			r['allenpike']='CKYIC2JJ';
			r['anthonyterrien']='CKYI5KJN';
			r['appitizeus']='CKYIV5QI';
			r['astronautwebco']='CKYIK23W';
			r['asymcocom']='CKYIC2QW';
			r['authnuxtjsorg']='CK7DTKJ7';
			r['axiosnuxtjsorg']='CK7DTK7J';
			r['bestaboutpagescom']='CKYIVKJJ';
			r['bestagencysitescom']='CKYIVKJN';
			r['bestproductsitescom']='CKYIVKJU';
			r['bloggetbootstrapcom']='CKYIKKJJ';
			r['grayghostvisuals']='CKYI527M';
			r['blogjoelambertcouk']='CKYIKK3Y';
			r['blogsignalnoisecom']='CKYIVKQ7';
			r['bluepiccadillycom']='CKYIKKQE';
			r['bookofspeedcom']='CKYIE27W';
			r['boostlogio']='CK7DT2QU';
			r['browserhackscom']='CKYIKKJY';
			r['brutalistwebsitescom']='CKYIKK3J';
			r['bse64com']='CKYIE2JJ';
			r['charlieparkorgbootstrapbuttons']='CKYIKKQU';
			r['cmtyio']='CK7DT2Q7';
			r['cmybaconcom']='CKYIVKQY';
			r['codeguide']='CKYI52JU';
			r['codularcom']='CKYI5KQE';
			r['colorzillacom']='CKYIK53N';
			r['colorzillacomgradienteditor']='CK7DT23W';
			r['wwwcomicsanscriminalcom']='CKYIV2JU';
			r['compassstyleorg']='CKYI52QY';
			r['creativerootsorg']='CKYIVK7U';
			r['css3generatorcom']='CKYIK5QU';
			r['cssflowcom']='CKYIKKQW';
			r['cssglobecom']='CKYIK5QW';
			r['cssmenumakercom']='CKYI5KQ7';
			r['cultttcom']='CKYI523E';
			r['dailynowco']='CK7DT2QM';
			r['darsain']='CKYIKKJE';
			r['devblogavdiorg']='CKYIK23U';
			r['discordserverscom']='CK7DTKQJ';
			r['drupal']='CKYIEKJI';
			r['eclipsecolorthemesorg']='CKYIKK3I';
			r['wwwelezeacom']='CKYICK7N';
			r['expogetbootstrapcom']='CKYIKKQ7';
			r['fa2pngio']='CKYIPK7I';
			r['flyositycom']='CKYIC23I';
			r['wwwfontfacecom']='CKYI5K7Y';
			r['fontshopcom']='CKYIP5QN';
			r['fontsinusecom']='CKYIP537';
			r['formalizeme']='CKYI5237';
			r['freebiesboothcom']='CKYIV2JI';
			r['getcronocom']='CKYIVKQJ';
			r['getfireshellcom']='CKYIKK7N';
			r['getgravorg']='CKYIL27M';
			r['getwirefycom']='CKYI523U';
			r['ghussegithubiojqrangeslider']='CKYIK2QL';
			r['gitterim']='CKYI55QI';
			r['givengoco']='CKYIK2QI';
			r['goratchetcom']='CKYIK2QJ';
			r['houseofbuttonstumblrcom']='CKYIV27N';
			r['hugogiraudelcom']='CKYIKKQY';
			r['wwwiainclaridgecouk']='CKYIV27E';
			r['idpinthatcom']='CKYIVK7N';
			r['idsgnorg']='CKYIV53L';
			r['jaysalvatcom']='CKYI5K7M';
			r['jgthmscom']='CK7DT23M';
			r['jquerystepscom']='CKYIKK7L';
			r['jsbincom']='CKYIEKJY';
			r['jspatternscom']='CKYIE27I';
			r['jsternet']='CKYI5KQM';
			r['learnsketch']='CKYIV5QW';
			r['leemunroecom']='CKYI52JI';
			r['letteringjscom']='CKYIKK3W';
			r['linotypecom']='CKYIP5QE';
			r['listennotescom']='CKYIC5QY';
			r['lovelystationerycom']='CKYIVKQI';
			r['mapstylrcom']='CKYIK23I';
			r['markdottocom']='CKYI52QU';
			r['matthewbuchananname']='CKYIVKQU';
			r['meanthemescom']='CKYIK23Y';
			r['methodandcraftcom']='CKYIV53N';
			r['minimaldeskscom']='CKYIC23Y';
			r['minimallyminimalcom']='CKYIC23U';
			r['mockuuupscom']='CKYIP23L';
			r['mouappcom']='CKYI52JJ';
			r['myfaves']='CKYIC2QM';
			r['nicewebtypecom']='CKYIV537';
			r['noteandpointcom']='CKYIC23L';
			r['onepagemaniacom']='CKYIVK7J';
			r['onethingwellorg']='CKYIKK3N';
			r['payloadjscom']='CK7DT2QI';
			r['perfplanetcom']='CKYIE27L';
			r['phpiedcom']='CKYIE27J';
			r['plnkrco']='CKYIKKJI';
			r['poolgacom']='CKYIVKQN';
			r['prismjscom']='CKYIEKQU';
			r['projectboardxyz']='CK7DTK7I';
			r['prototyprio']='CKYIV2QY';
			r['pwanuxtjsorg']='CK7DTK7E';
			r['pythonguideorg']='CKYI5K3M';
			r['qansercom']='CKYIP5QM';
			r['abduzeedocom']='CKYIV53Y';
			r['reactrocks']='CKYIL5QL';
			r['responsivenavigationnet']='CKYIKKJ7';
			r['robandlaurencom']='CKYI527N';
			r['rohdesigncom']='CKYIV53U';
			r['rsio']='CKYIC2JE';
			r['sachagreifcom']='CKYIC23M';
			r['shawnblancnet']='CKYIC23E';
			r['slipsumcom']='CKYI527U';
			r['stuarthall']='CKYIC2Q7';
			r['styleboostcom']='CKYIVK7Y';
			r['symfonycom']='CKYILK3J';
			r['taybenlorcom']='CKYIKKJM';
			r['thecleverestcom']='CKYIVKJW';
			r['thehipperelement']='CKYIV277';
			r['themainthreadcom']='CKYI52JW';
			r['wwwthepetedesigncom']='CKYI5KJE';
			r['thesasswaycom']='CKYI52QN';
			r['timolivercomau']='CKYIC2QY';
			r['tinypngcom']='CK7DTKJW';
			r['toolsandtoysnet']='CKYICK7Y';
			r['tweepsectcom']='CKYIC2QI';
			r['twinefm']='CKYIP53J';
			r['typescalecom']='CKYIV2JW';
			r['typezebracom']='CKYIVK7L';
			r['typiconscom']='CKYIVKJY';
			r['ui-cloudcom']='CKYIPK3E';
			r['uipatternscom']='CKYICK7U';
			r['uiresourcescom']='CKYIP277';
			r['wwwusabilitypostcom']='CKYIV27M';
			r['uxmasterycom']='CKYICK7M';
			r['vaporcodes']='CK7DT2QW';
			r['wwwvectorgraphitcom']='CKYIV2JE';
			r['verynicesitescom']='CKYIV23J';
			r['vimgifscom']='CKYIE5QN';
			r['wankencom']='CKYIV53M';
			r['webdesignandsuchcom']='CKYI5K3N';
			r['webdesignrepocom']='CKYI55QM';
			r['perfectpixeledge']='CKYIL27Y';
			r['perfectpixelopera']='CKYIL27U';
			r['perfectpixelsafari']='CKYIL277';
			r['wfhio']='CKYIC53N';
			r['wordmarkit']='CKYIVKJL';
			r['workfromco']='CKYIC27J';
			r['wtfforms']='CKYI527E';
			r['wtfhtmlcss']='CKYI52JY';
			r['zerosixthree']='CKYI527L';
			r['perfectionkillscom'] = 'CKYIKK3L';
			r['eclipsecolorthemesorg'] = 'CKYIKK3I';
			r['letteringjscom'] = 'CKYIKK3W';
			r['onethingwellorg'] = 'CKYIKK3N';
			r['patternifycom'] = 'CK7DT5QE';
			r['blogjoelambertcouk'] = 'CKYIKK3Y';
			r['bluepiccadillycom'] = 'CKYIKKQE';
			r['cssflowcom'] = 'CKYIKKQW';
			r['charlieparkorgbootstrapbuttons'] = 'CKYIKKQU';
			r['hugogiraudelcom'] = 'CKYIKKQY';
			r['expogetbootstrapcom'] = 'CKYIKKQ7';
			r['darsain'] = 'CKYIKKJE';
			r['bloggetbootstrapcom'] = 'CKYIKKJJ';
			r['plnkrco'] = 'CKYIKKJI';
			r['taybenlorcom'] = 'CKYIKKJM';
			r['browserhackscom'] = 'CKYIKKJY';
			r['responsivenavigationnet'] = 'CKYIKKJ7';
			r['jquerystepscom'] = 'CKYIKK7L';
			r['getfireshellcom'] = 'CKYIKK7N';
			r['tnycz'] = 'CKYIKK7U';
			r['mapstylrcom'] = 'CKYIK23I';
			r['astronautwebco'] = 'CKYIK23W';
			r['devblogavdiorg'] = 'CKYIK23U';
			r['meanthemescom'] = 'CKYIK23Y';
			r['goratchetcom'] = 'CKYIK2QJ';
			r['ghussegithubiojqrangeslider'] = 'CKYIK2QL';
			r['givengoco'] = 'CKYIK2QI';
			r['lovelystationerycom'] = 'CKYIVKQI';
			r['poolgacom'] = 'CKYIVKQN';
			r['matthewbuchananname'] = 'CKYIVKQU';
			r['cmybaconcom'] = 'CKYIVKQY';
			r['blogsignalnoisecom'] = 'CKYIVKQ7';
			r['bestaboutpagescom'] = 'CKYIVKJJ';
			r['thecleverestcom'] = 'CKYIVKJW';
			r['bestagencysitescom'] = 'CKYIVKJN';
			r['bestproductsitescom'] = 'CKYIVKJU';
			r['typiconscom'] = 'CKYIVKJY';
			r['onepagemaniacom'] = 'CKYIVK7J';
			r['typezebracom'] = 'CKYIVK7L';
			r['idpinthatcom'] = 'CKYIVK7N';
			r['creativerootsorg'] = 'CKYIVK7U';
			r['styleboostcom'] = 'CKYIVK7Y';
			r['alessioatzenicom'] = 'CKYIV23E';
			r['verynicesitescom'] = 'CKYIV23J';
			r['colorzillacom'] = 'CKYIK53N';
			r['cssglobecom'] = 'CKYIK5QW';
			r['css3generatorcom'] = 'CKYIK5QU';
			r['webdesignandsuchcom'] = 'CKYI5K3N';
			r['codularcom'] = 'CKYI5KQE';
			r['jsternet'] = 'CKYI5KQM';
			r['cssmenumakercom'] = 'CKYI5KQ7';
			r['wwwthepetedesigncom'] = 'CKYI5KJE';
			r['anthonyterrien'] = 'CKYI5KJN';
			r['jaysalvatcom'] = 'CKYI5K7M';
			r['wwwvectorgraphitcom'] = 'CKYIV2JE';
			r['freebiesboothcom'] = 'CKYIV2JI';
			r['wwwfontfacecom'] = 'CKYI5K7Y';
			r['typescalecom'] = 'CKYIV2JW';
			r['wwwcomicsanscriminalcom'] = 'CKYIV2JU';
			r['wwwiainclaridgecouk'] = 'CKYIV27E';
			r['uxmasterycom'] = 'CKYICK7M';
			r['wwwusabilitypostcom'] = 'CKYIV27M';
			r['houseofbuttonstumblrcom'] = 'CKYIV27N';
			r['uipatternscom'] = 'CKYICK7U';
			r['thehipperelement'] = 'CKYIV277';
			r['formalizeme'] = 'CKYI5237';
			r['toolsandtoysnet'] = 'CKYICK7Y';
			r['shawnblancnet'] = 'CKYIC23E';
			r['idsgnorg'] = 'CKYIV53L';
			r['noteandpointcom'] = 'CKYIC23L';
			r['aisleonenet'] = 'CKYIV53W';
			r['flyositycom'] = 'CKYIC23I';
			r['wankencom'] = 'CKYIV53M';
			r['methodandcraftcom'] = 'CKYIV53N';
			r['thesasswaycom'] = 'CKYI52QN';
			r['rohdesigncom'] = 'CKYIV53U';
			r['markdottocom'] = 'CKYI52QU';
			r['abduzeedocom'] = 'CKYIV53Y';
			r['nicewebtypecom'] = 'CKYIV537';
			r['compassstyleorg'] = 'CKYI52QY';
			r['sachagreifcom'] = 'CKYIC23M';
			r['minimallyminimalcom'] = 'CKYIC23U';
			r['minimaldeskscom'] = 'CKYIC23Y';
			r['mouappcom'] = 'CKYI52JJ';
			r['tweepsectcom'] = 'CKYIC2QI';
			r['asymcocom'] = 'CKYIC2QW';
			r['myfaves'] = 'CKYIC2QM';
			r['leemunroecom'] = 'CKYI52JI';
			r['themainthreadcom'] = 'CKYI52JW';
			r['timolivercomau'] = 'CKYIC2QY';
			r['appitizeus'] = 'CKYIV5QI';
			r['codeguide'] = 'CKYI52JU';
			r['wtfhtmlcss'] = 'CKYI52JY';
			r['stuarthall'] = 'CKYIC2Q7';
			r['wtfforms'] = 'CKYI527E';
			r['learnsketch'] = 'CKYIV5QW';
			r['rsio'] = 'CKYIC2JE';
			r['allenpike'] = 'CKYIC2JJ';
			r['grayghostvisuals'] = 'CKYI527M';
			r['robandlaurencom'] = 'CKYI527N';
			r['slipsumcom'] = 'CKYI527U';
			r['ui-cloudcom'] = 'CKYIPK3E';

		if(this.isset(r[placement]) && (serve == 'CVYD42T' || serve == 'CVYD42E' || serve == 'C6AILKT' || serve == 'CKYICKQI'))
			return r[placement];
		else if (serve == 'CVYD42T' || serve == 'CVYD42E' || serve == 'C6AILKT')
			return 'CKYICKQI';
		else
			return serve;
	},
	
	getUrlVar: function(name, target)
	{
	    target = typeof target !== 'undefined' ? target : document.getElementById('_adpacks_js').src,
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regexS = "[\\?&]" + name + "=([^&#]*)";
	    var regex = new RegExp(regexS);
	    var results = regex.exec(target);
	    if (results == null) return '';
	    else return results[1];
	},
	
	isset: function(v)
	{
		return typeof v !== 'undefined' && v != null;
	},
	
	refresh: function()
	{
		this.remove(document.getElementById('_carbonads_projs'));
		this.remove(document.getElementById('carbonads'));
		this.init();
	},
	
	reload: function(where, force_serve)
	{
		this.remove(document.getElementById('_carbonads_projs'));
		this.init(where, force_serve);
	},
	
	remove: function(el) 
	{
		if (typeof el !== 'undefined' && el != null)
			el.parentNode.removeChild(el);
	},
	
	isNum: function (a)
	{
	   return (a - 0) == a && a.length > 0;
	}

};
function _carbonads_go (b) 
{
	var ad = b['ads'][0], link, fulllink, image, description, time = Math.round(Date.now() / 10000) | 0;
	var placement = _carbonads.getUrlVar('placement');
	var serve = _carbonads.getUrlVar('serve');
	
	if(ad.html != null)
	{
		var ad_html = JSON.parse(ad.html);
		ad.image = ad_html.image,
		ad.statlink = ad_html.statlink,
		ad.description = ad_html.description,
		ad.pixel = ad_html.pixel;
		ad.fetch = ad_html.fetch;
		ad.click_redir = ad_html.click_redir;
	}
	
	// this is only used for showing house ads right now
	// we auto-append the placement and network
	if(ad.fetch != null)
	{
		var fetch = document.createElement('script');
		    fetch.type = 'text/javascript';
		    fetch.id = '_carbonads_fetchjs';
		    fetch.src = ad.fetch;
		if(ad.fetch.match('fallbacks.carbonads.com'))
			fetch.src += '/' + placement + '/8/';
		if(ad.click_redir != null)
			fetch.src += '?click_redir=' + encodeURIComponent(ad.click_redir.replace(/srv.buysellads.com/g, 'srv.carbonads.net'));
		document.getElementsByTagName('head')[0].appendChild(fetch);
		_carbonads.remove(document.getElementById('_carbonads_fetchjs'));
		return;
	}

	if(!_carbonads.isset(ad.statlink) && (_carbonads.isset(ad.fallbackImage) || _carbonads.isset(ad.fallbackLink) || _carbonads.isset(ad.fallbackTitle === null)))
	{
		var fallback = document.createElement('script');
		    fallback.type = 'text/javascript';
		    fallback.id = '_carbonads_fallbackjs';
		    fallback.src = '//srv.carbonads.net/ads/CK7DT53I.json?segment=placement:' + placement + '&callback=_carbonads_go';
		document.getElementsByTagName('head')[0].appendChild(fallback);
		_carbonads.remove(document.getElementById('_carbonads_fallbackjs'));
		return;
	}
	
	image = _carbonads.isset(ad.image) ? ad.image : _carbonads.isset(ad.smallImage) ? ad.smallImage : ad.fallbackImage;
	link = _carbonads.isset(ad.statlink) ? ad.statlink.split('?encredirect=') : ad.fallbackLink;
	description = _carbonads.isset(ad.description) ? ad.description : _carbonads.isset(ad.title) ? ad.title : ad.fallbackTitle;
	
	if(typeof link[1] != 'undefined' && _carbonads.isset(ad.statlink))
		fulllink = link[0] + '?segment=placement:' + placement + ';&encredirect=' + encodeURIComponent(link[1]);
	else if (link[0].search('srv.buysellads.com') > 0 && _carbonads.isset(ad.statlink))
		fulllink = link[0] + '?segment=placement:' + placement + ';';
	else if(Array.isArray(link))
		fulllink = link[0];
	else
		fulllink = link;
		
	fulllink = fulllink.replace(/srv.buysellads.com/g, 'srv.carbonads.net');
	
	if (_carbonads.isNum(_carbon_legacyid)) 
	{
		var el = document.createElement('div');
			el.className = 'bsap';
			el.innerHTML = '<div class="bsa_it one"><div class="bsa_it_ad"><a href="' + fulllink.replace('[timestamp]', time) + '" target="_blank"><span class="bsa_it_i"><img src="' + image + '" width="130" height="100" alt=""></span></a><a href="' + fulllink.replace('[timestamp]', time) + '" target="_blank"><span class="bsa_it_d">' + description + '</span></a><div style="clear:both"></div></div><span class="bsa_it_p"><a href="http://carbonads.net/" target="_blank">ads via Carbon</a></span></div>';
	}
	else 
	{
		var el = document.createElement('span');
			el.innerHTML = '<span class="carbon-wrap"><a href="' + fulllink.replace('[timestamp]', time) + '" class="carbon-img" target="_blank" rel="noopener"><img src="' + image + '" alt="" border="0" height="100" width="130" /></a><a href="' + fulllink.replace('[timestamp]', time) + '" class="carbon-text" target="_blank" rel="noopener">' + description + '</a></span>';
	
		if(!_carbonads.isset(ad.removecarbon))
			el.innerHTML += '<a href="http://carbonads.net/?utm_source=' + placement + '&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon" class="carbon-poweredby" target="_blank" rel="noopener">ads via Carbon</a>';
	}
	
	if(typeof ad.pixel != 'undefined')
	{
		var pixels = ad.pixel.split('||');
		for (var j = 0; j < pixels.length; j++)
		{
			var pix = document.createElement('img');
				pix.src = pixels[j].replace('[timestamp]', time);
				pix.border = '0';
				pix.height = '1';
				pix.width = '1';
				pix.style.display = 'none';
			el.appendChild(pix);
		}
	}
	
	var n = document.getElementsByClassName('carbon-wrap');
	var fdiv = document.createElement('div');
		fdiv.id = n.length > 0 ? 'carbonads_' + n.length : 'carbonads';
		fdiv.appendChild(el);
	
	var carbonjs = document.getElementById('_adpacks_js');
	if(carbonjs != null)
		if(_carbonads.isset(_carbon_where))
			_carbon_where.appendChild(fdiv);
		else
			carbonjs.parentNode.insertBefore(fdiv, carbonjs.nextSibling);
		
	var mw = document.querySelectorAll('.carbon-img > img');
	for (var i = 0; i < mw.length; i++)
		mw[i].style.maxWidth = '130px';
	
	// if the ad we just dropped has a freq cap we
	// need to update the freqcap cookie
	_bsap_serving_callback(ad.bannerid, ad.zonekey, ad.freqcap);

}
_carbonads.init();

window['_bsap_serving_callback'] = function(banner, zone, freqcap) {
	var append = function(w, data, days) {
			var c = document.cookie,
				i = c.indexOf(w + '='),
				existing = i >= 0 ? c.substring(i + w.length + 1).split(';')[0] + '%2C' : '',
				d = new Date();
			d.setTime(days * 3600000 + d);
			data = existing + data;
			data = data.substring(0, 2048);
			document.cookie = w + '=' + data + '; expires=' + d.toGMTString() + '; path=\/';
		};

	if (freqcap) {
		append('_bsap_daycap', banner, 1);
		append('_bsap_lifecap', banner, 365);
	}
};