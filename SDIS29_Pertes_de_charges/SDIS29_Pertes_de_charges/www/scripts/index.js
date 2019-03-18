function getSdisData() {
    var choix_lance = localStorage.getItem("choix_lance");
    var debit_lance = localStorage.getItem("debit_lance");
    var nb_45 = localStorage.getItem("nb_45");
    var nb_70 = localStorage.getItem("nb_70");
    var denivele = localStorage.getItem("denivele");
    window.alert(debit_lance);
};


function setSdisData(name) {
    localStorage.setItem(name, document.getElementById(name).value);
    window.alert(document.getElementById(name).value);
};

function getPertesDeCharges() {s
    var nb_45 = localStorage.getItem("nb_45");
};