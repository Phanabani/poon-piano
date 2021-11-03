// @ts-nocheck
import { importAll, Module } from 'utils/import';

interface ThemeToModules {
  [theme: string]: Module[];
}

export const THEME_TO_NOTE_MODULES: ThemeToModules = {
  sharky: importAll(
    require.context('./sharky/notes', false, /\.ogg$/),
  ),
};

export const THEME_TO_IMAGE_MODULES: ThemeToModules = {
  sharky: importAll(
    require.context('./sharky/images', false, /\.(jpg|svg)$/),
  ),
};
