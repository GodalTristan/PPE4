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

    var pertes_tuyau_45 = readLine('p_tuyau_45');
    var pertes_tuyau_70 = readLine('p_tuyau_70');
    var pertes_tuyau_110 = readLine('p_tuyau_110');

    var j_tuyaux_70 = (pertes_tuyau_70 * (debit_lance / 250)) * (pertes_tuyau_70 * (debit_lance / 250));
    var j_tuyaux_45 = (pertes_tuyau_45 * (debit_lance / 250)) * (pertes_tuyau_45 * (debit_lance / 250));
    var j_tuyaux_110 = (pertes_tuyau_110 * (debit_lance / 250)) * (pertes_tuyau_110 * (debit_lance / 250));
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
        var pression_nominale = readLine('ldv_500_value');
    } else if (choix_lance == "ldv_1000") {
        var pression_nominale = readLine('ldv_1000_value');
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
/**
 * Crypt SHA256
 * @param {any} s
 */

function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function S(X, n) { return (X >>> n) | (X << (32 - n)); }
    function R(X, n) { return (X >>> n); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
};
/**
 * Connexion au panel admin
 */
function connect() {
    var username = document.getElementById("admin_username").value;
    var password = document.getElementById("admin_password").value;

    var crypt_password = SHA256(password);

    if (username == "admin" && crypt_password == "7d4dfd8aae94ad69516607fb0e57bb03a939ad1c7b68ca45b037cf568ad7a3be") {
        location.href = 'panel.html';
        localStorage.setItem("connect_access", "access_granted");
    } else {
        document.getElementById("connect_error").innerHTML = "Echec de la connexion, identifiants incorrects.";
        localStorage.setItem("connect_access", "access_refused");
    }

};

/**
 * Vérification de la connexion
 */
function verifyConnect() {
    var connect_status = localStorage.getItem("connect_access");

    if (connect_status != "access_granted") {
        location.href = 'admin.html';
    } else {
        document.getElementById("ldv_500_value").value = readLine("ldv_500_value");
        document.getElementById("ldv_1000_value").value = readLine("ldv_1000_value"); 

        document.getElementById("p_tuyau_45").value = readLine("p_tuyau_45");
        document.getElementById("p_tuyau_70").value = readLine("p_tuyau_70");
        document.getElementById("p_tuyau_110").value = readLine("p_tuyau_110"); 
    }
};

/**
 * Lire le fichier JSON
 * @param {any} champs
 */
function readLine(champs) {
    var json = function () {
        var jsonTemp = null;
        $.ajax({
            'async': false,
            'url': "js/params.json",
            'success': function (data) {
                jsonTemp = data;
            }
        });
        return jsonTemp;
    }();

    return json[champs];
};

function updateJSON(champs, value) {

    var json = function () {
        var jsonTemp = null;
        $.ajax({
            'async': false,
            'url': "js/params.json",
            'success': function (data) {
                jsonTemp = data;
            }
        });
        return jsonTemp;
    }();

    var last_value = readLine(champs);

    var str_json = JSON.stringify(json);
    var new_json = str_json.replace(champs + "\":" + last_value, champs + "\":" + value);

    $.ajax({
        url: 'js/params.json',
        type: 'POST',
        data: new_json,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success: function (data) {
            console.log(data);
            alert(data);
        }
    });
    window.alert(new_json);
    

};