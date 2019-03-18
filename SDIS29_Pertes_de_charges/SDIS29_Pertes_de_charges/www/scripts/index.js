/**
 * Clear toutes les données déjà stockées
 */
function clearStorage() {
    localStorage.clear();
};

/**
 * Créer un item en local et lui donne une valeur
 * @param string name
 */
function setSdisData(name) {
    localStorage.setItem(name, document.getElementById(name).value);
};

/**
 * Calcul des pertes de charges
 * @Return decimal
 */
function getPertesDeCharges() {

    var debit_lance = localStorage.getItem("debit_lance");
    var nb_45 = localStorage.getItem("nb_45");
    var nb_70 = localStorage.getItem("nb_70");
    var nb_110 = localStorage.getItem("nb_110");
    var denivele = localStorage.getItem("nb_denivele");

    var j_tuyaux_70 = (0.55 * (debit_lance / 250)) * (0.55 * (debit_lance / 250));
    var j_tuyaux_45 = (1.5 * (debit_lance / 250)) * (1.5 * (debit_lance / 250));
    var j_tuyaux_110 = (0.28 * (debit_lance / 250)) * (0.28 * (debit_lance / 250));
    var p_tuyaux_110 = ((nb_110 * 10) * j_tuyaux_110) / 100;
    var p_tuyaux_70 = ((nb_70 * 20) * j_tuyaux_70) / 100;
    var p_tuyaux_45 = ((nb_45 * 20) * j_tuyaux_45) / 100;

    /**
     * Gestion du dénivelé
     */
    var checkbox_denivele = $('#check_denivele').is(':checked');
    if (checkbox_denivele == true) {
        var p_denivele = denivele / 10;
        var p_denivele = -p_denivele;
    } else if (checkbox_denivele == false){
        var p_denivele = denivele / 10;
    }
    var pertes_charges_totale = p_tuyaux_45 + p_tuyaux_70 + p_tuyaux_110 + p_denivele;

    return pertes_charges_totale.toFixed(2);
};

/**
 * Définit la pression nominale par lance
 */
function getPressionNominale() {
    var choix_lance = localStorage.getItem("choix_lance");

    if (choix_lance == "ldv_500") {
        var pression_nominale = 6;
    } else if (choix_lance == "ldv_1000") {
        var pression_nominale = 7;
    }

    return pression_nominale;
};

/**
 * Affiche les résultats
 */
function showResult(last_param) {

    localStorage.setItem(last_param, document.getElementById(last_param).value);

    if (getPertesDeCharges()) {
        var pertes = getPertesDeCharges();
        var pression_nominale = getPressionNominale();
        var total = parseFloat(pertes) + parseFloat(pression_nominale);


        document.getElementById("result_display").innerHTML = pertes + " bars";
        document.getElementById("result_total").innerHTML = total.toFixed(2) + " bars";
    } else {
        var pression_nominale = getPressionNominale();

        document.getElementById("result_display").innerHTML = "0 bars";
        document.getElementById("result_total").innerHTML = pression_nominale + " bars";
    }

    location.href = '#resultats';
    
};