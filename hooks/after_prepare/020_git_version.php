#!/usr/bin/env php
<?php


foreach(explode(',', $_SERVER['CORDOVA_PLATFORMS']) as $platform)
{
	switch($platform)
	{
	case 'android':
		$file = "platforms/android/res/xml/config.xml";
		break;
	}
	
	$xml = simplexml_load_file($file);
	
	
	$useragent = null;
	foreach ($xml->preference as $pref)
	{
		if ($pref['name'] == 'OverrideUserAgent')
		{
			$useragent = $pref;
			break;
		}
	}
	
	$tag = trim(shell_exec('git describe --tags | head -n 1'));
	$hash = trim(shell_exec(
		'git reflog HEAD | grep \'checkout:\\|clone:\' 2>/dev/null | '.
		'head -n 1 | awk -F \' \' \'{print $1}\''
	));
	$branch = trim(shell_exec('git rev-parse --abbrev-ref HEAD'));
	
	if ($useragent === null)
	{
		$useragent		= $xml->addChild('preference');
		$useragent['name']	= 'OverrideUserAgent';
		$useragent['value']	= 'MansaPromo-Ionic/' . 
			($branch == 'master' && $tag ? $tag : $branch) . 
			'-' . $hash;
	}
	
	file_put_contents($file, $xml->asXML());
}
