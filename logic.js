// Diese Funtkon wird beim Verschlüsseln onclick event aufgerufen
function encrypt(){
    // Als Variablen brauche in dien Verschiebungswert als Integer und natürlich den Text
    var verschiebung = parseInt(document.getElementById("verschiebung").value);
    var plaintext = document.getElementById("usertext").value;
    var plainarray = plaintext.toLowerCase().split("");
    var cipherarray = [];
    //Dieser for loop verschiebt alle alphabetischen Buchstaben, die anderen Zeichen werden unverschlüsselt angehängt
    for (el=0; el < plainarray.length; el++){
        if(abc.includes(plainarray[el])){
            newposition = abc.indexOf(plainarray[el]) + verschiebung;
            cipherarray.push(abc[newposition]);
        }
        else{
            cipherarray.push(plainarray[el]);
        }
    };
    // Hier füge ich den verschlüsselten Text in das HTML Element ein
    document.getElementById("outputtext").innerHTML = cipherarray.join("");
    // Hier rufe ich die create_button_funktion auf
    create_copy_button();
};

// Mithilfe eines verschachtelten for loops lässt sich das häufigste Element eines Arrays ohne Probleme bestimmen
// bei diesem Element handelt es sich dann um das Geheime E
function mostcommen(cipherarray){
    var most_commen = 0;
    for(el=0; el < cipherarray.length; el++){
        var current_counter = 0;
        // Das vorkommen des momentanten Elements findet statt, wenn das Element im Alphabet vorkommt
        if(abc.includes(cipherarray[el])){
            for(currentel=0; currentel < cipherarray.length; currentel++){
                if(cipherarray[el]==cipherarray[currentel]){
                    current_counter ++;
                }
            }
            if(current_counter > most_commen){
                most_commen = current_counter;
                var e_key = cipherarray[el];
            }
        }else{
            continue;
        }
    }
    // Hier gebe ich das häufigste Element des Arrays zurück
    return e_key;
};
// Diese Funktion wird beim Entschlüsseln onclick event aufgerufen
function decrypt(){
    // als Variablen brauchen wir den Geheimtext
    var ciphertext = document.getElementById("usertext").value;
    var cipherarray = ciphertext.toLowerCase().split("");
    // Mit hilfe der Häufigkeitsanalyse lässt sich das Geheime "E" bestimmen 
    var cipher_e = mostcommen(cipherarray);                
    // Aus der Differenz der öffentlichen und geheimen E-Position können wir die Rückverschverschiebung bestimmen
    // Die Diferenz kann eine positive oder negative Zahl sein.
    var rückverschiebung = abc.indexOf(cipher_e) - abc.indexOf('e');
    
    var plainarray = [];
    //mit einem for loop  wird jedes alphabetische Element entschlüsselt
    for(el=0; el < cipherarray.length; el++){
        if(abc.includes(cipherarray[el])){ 
            // Die neue Postion ergibt sich aus der aktuellen Postion - rückverschiebung
            var newposition = abc.indexOf(cipherarray[el]) - (rückverschiebung);
            // Es muss überprüft werden, ob die neue Postion positiv oder negativ ist
            if(newposition >= 0){
                //newpostion is positive wir müssen vom ersten Index ausgehen
                plainarray.push(abc[newposition]);
            }else{ //newpostion is negative +- = - | wir müssen vom letzten Index ausgehen
                plainarray.push(abc[abc.length + newposition]);
            }
            
        }else{
            plainarray.push(cipherarray[el]);
            
        }
    }
    // Hier füge ich den entschlüsselten Text in ein HTML Element ein
    document.getElementById("outputtext").innerHTML = plainarray.join("");
    // Hier rufe ich die create_button_funktion auf
    create_copy_button();
};

// Dieser Button wird erstellt nachdem eine Nachricht ver- oder entschlüsselt wurde, Um kopieren per Mausklick zu ermöglichen
function create_copy_button(){
    // Falls noch kein copy-Button existiert wird einer erstellt
    if (!(document.getElementById("copy"))){
        var b = document.createElement("input");
        b.setAttribute("type", "button");
        b.setAttribute("id", "copy");
        b.setAttribute("value", "copy output");
        b.setAttribute("onclick", "copy_output()");
        document.body.appendChild(b);
    }
}
// Onclick wird der Outputtext kopiert
function copy_output(){
    var copytext = document.getElementById("outputtext");
    copytext.select();
    copytext.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

 var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];