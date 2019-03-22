//Valeur des paramètres

var ldv_500_value = 6;
var ldv_1000_value = 7;
var p_tuyau_45 = 1.5;
var p_tuyau_70 = 0.55;
var p_tuyau_110 = 0.28;
/**
 * Clear toutes les données déjà stockées
 */
function clearStorageAndDeclareParams() {
    localStorage.clear();
    localStorage.setItem("ldv_500_value", ldv_500_value);
    localStorage.setItem("ldv_1000_value", ldv_1000_value);
    localStorage.setItem("p_tuyau_45", p_tuyau_45);
    localStorage.setItem("p_tuyau_70", p_tuyau_70);
    localStorage.setItem("p_tuyau_110", p_tuyau_110);
};