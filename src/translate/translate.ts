import { OpaqueToken } from '@angular/core';

// Aqui se importara los archivos ts de los lenguajes que tendra el sistema
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';

// toke de traduccion
export const TRANSLATIONS = new OpaqueToken('translations');

// todas las traducciones del sistema
export const dictionary = {};
	dictionary[LANG_ES_NAME]= LANG_ES_TRANS,
	dictionary[LANG_EN_NAME]= LANG_EN_TRANS


// providers 
export const TRANSLATION_PROVIDERS = [
{ provide: TRANSLATIONS, useValue: dictionary },
];