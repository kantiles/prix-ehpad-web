
// afficher info départements
map.on('click', 'fond_departements', (e) => {

    // on récupère les propriétés
    const feature = e.features[0];
    const nom_dep = feature.properties.nom_dep;
    const prixHebPermCs = feature.properties.prixHebPermCs * 30;
    const prixHebPermCd = feature.properties.prixHebPermCd * 30;
    const TARIF_GIR_56 = feature.properties.TARIF_GIR_56 * 30;

    // on colore le département sélectionné avec un filtre
    map.setFilter('fond_filtre_departements', [
        'in',
        'code_dep',
        feature.properties.code_dep
        ]);

    // on calcule les phrases de comparaison
    // --> national en dur ici, on pourrait les prendre au load si besoin
    const diff_simple = prixHebPermCs / 2116.3 - 1;
    let phrase_simple = 0;

    if (diff_simple >= 0) {
        phrase_simple = "<span style='color:#55a9cd;'>" + Math.round(diff_simple * 100) + "% </span> de plus que la moyenne nationale";
    } else {
        phrase_simple = "<span style='color:#ad314c;'>" + -Math.round(diff_simple * 100) + "% </span> de moins que la moyenne nationale";
    }

    const diff_double = prixHebPermCd / 1919.1 - 1;
    let phrase_double = 0;

    if (diff_double >= 0) {
        phrase_double = "<span style='color:#55a9cd;'>" + Math.round(diff_double * 100) + "% </span> de plus que la moyenne nationale";
    } else {
        phrase_double = "<span style='color:#ad314c;'>" + -Math.round(diff_double * 100) + "% </span> de moins que la moyenne nationale";
    }

    const diff_gir56 = TARIF_GIR_56 / 173.2 - 1;
    let phrase_gir56 = 0;

    if (diff_gir56 >= 0) {
        phrase_gir56 = "<span style='color:#55a9cd;'>" + Math.round(diff_gir56 * 100) + "% </span> de plus que la moyenne nationale";
    } else {
        phrase_gir56 = "<span style='color:#ad314c;'>" + -Math.round(diff_gir56 * 100) + "% </span> de moins que la moyenne nationale";
    }

    // on transmet les valeurs
    document.getElementById('val-nom-dep').textContent = nom_dep;
    document.getElementById('val-simple-dep').textContent = Math.round(prixHebPermCs) + "€";
    document.getElementById('val-simple-dep').nextElementSibling.innerHTML = phrase_simple;
    document.getElementById('val-double-dep').textContent = Math.round(prixHebPermCd) + "€";
    document.getElementById('val-double-dep').nextElementSibling.innerHTML = phrase_double;
    document.getElementById('val-gip56-dep').textContent = Math.round(TARIF_GIR_56) + "€";
    document.getElementById('val-gip56-dep').nextElementSibling.innerHTML = phrase_gir56;
});

// reset button ---------------------------
// recup des valeurs au load (pas besoin de load car pas défaut elles s'activent une seule fois)
var nom_dep_init = document.getElementById('val-nom-dep').textContent;
var prixHebPermCs_init = document.getElementById('val-simple-dep').textContent;
var phrase_simple_init = document.getElementById('val-simple-dep').nextElementSibling.innerHTML;
var prixHebPermCd_init = document.getElementById('val-double-dep').textContent;
var phrase_double_init = document.getElementById('val-double-dep').nextElementSibling.innerHTML;
var TARIF_GIR_56_init = document.getElementById('val-gip56-dep').textContent;
var phrase_gir56_init = document.getElementById('val-gip56-dep').nextElementSibling.innerHTML;

// button
document.getElementById('reset-button').addEventListener('click', (e) => {

  // on retire le filtre en remettant l'initial
  map.setFilter('fond_filtre_departements', ['in', 'code_dep', '']);

  // on remet les valeurs initiales
  document.getElementById('val-nom-dep').textContent = nom_dep_init;
  document.getElementById('val-simple-dep').textContent = prixHebPermCs_init;
  document.getElementById('val-simple-dep').nextElementSibling.innerHTML = phrase_simple_init;
  document.getElementById('val-double-dep').textContent = prixHebPermCd_init;
  document.getElementById('val-double-dep').nextElementSibling.innerHTML = phrase_double_init;
  document.getElementById('val-gip56-dep').textContent = TARIF_GIR_56_init;
  document.getElementById('val-gip56-dep').nextElementSibling.innerHTML = phrase_gir56_init;

}
);
