
class generic {
    get wPage()  { return { WIN_SEL_UNI: "lobby.ogame", WIN_LEILOES: "traderOverview", WIN_PFROTAS: "fleetdispatch" };}
    get CONSOLESTK() { return "Console_stack_"; }
    get MISSAO() { return {ATAQUE:1, ATAQUE_ACS:2, TRANSPORTAR:3,TRANSFERIR:4, MANTER_POSICAO:5, ESPIAR:6, COLONIZAR:7, RECICLAR:8, DESTRUIR_LUA:9, EXPEDICAO:15 };}

    get RowColor() { return { Recolha: [ "#AADE80", "#DDCBA2"], Default : ["#82A65F", "#BBA65F"]};}
    get fbtColor() { return { Normal: "#84C04A", Clicked : "#CDF6A7" }; }

    constructor () {
        this.forEchBreak = {};

        this.nmJogador = "LobbyPage";

        if ( window.location.href.indexOf(this.wPage.WIN_SEL_UNI) < 0 ) {
            this.nmJogador = playerName.replaceAll(' ','_');
        }

        this.leftM;

        this.planetid;
        this.planetcoords;
        this.alianceid;

        if ( window.location.href.indexOf(this.wPage.WIN_SEL_UNI) < 0 ) {
            try {
                this.playerid = document.head.querySelector("[name~=ogame-player-id][content]").content;
                this.playername = document.head.querySelector("[name~=ogame-player-name][content]").content;
                this.planetid = document.head.querySelector("[name~=ogame-planet-id][content]").content;
                this.planetcoords = document.head.querySelector("[name~=ogame-planet-coordinates][content]").content;
                this.alianceid = document.head.querySelector("[name~=ogame-alliance-id][content]").content;
                this.aliancename = document.head.querySelector("[name~=ogame-alliance-name][content]").content;
            } catch(ex) {}
        }

    }

    randInt( tmin, tmax ) {
        return Math.trunc(Math.random() * (tmax - tmin)) + tmin;
    }

    ntostr( value, decp ) { return value.toLocaleString( undefined, { minimumFractionDigits: decp || 0 }); }
    strton( value ) { return Number(value.replaceAll(',','')); }

    //formatpt( nm, decp ) { return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: decp || 0 }).format(nm);  }
    setsized ( instr, spt ) { return ( ("     " + instr).substring( -spt )); }

    valIfNull( test, pret )
    {
        let vret;
        if( test ) {
            vret = test;
        } else {
            if( (typeof(test) == "number" && test == 0) ||
               (typeof(test) == "string" && test == "")
              )
                vret = test
            else
                vret = pret;
        }

        return vret;
    }

    left_Menu() {
        this.leftM = document.createElement("ul");
        this.leftM.classList.add("leftmenu");

        $("ul#menuTable").parent().append( this.leftM );
    }

    bClick = (bRef, bTime, altc ) => {

        $(bRef).css('background-color', this.fbtColor.Clicked);
        if ( bTime > 0 )
            setTimeout( () => { $(bRef).css('background-color', altc || this.fbtColor.Normal); }, bTime );
    }


    btAdd(parentobj, btname, btId, prop ) {

        let obutton;
        if( btname == "" ) {
            obutton = document.createElement("span");
            obutton.innerHTML = "&nbsp;&nbsp;";
            //obutton.style.width = "  ";
        } else {
             prop = prop || {};
            let bColor = prop.color || this.fbtColor.Normal;

            obutton = document.createElement("button");
            obutton.type = prop.type || "button";

            obutton.innerText = btname;
            obutton.id = btId;
            obutton.style.width = prop.width || "50px";
            obutton.style.margin = "0px 1px 10px 1px";
            obutton.style.backgroundColor = bColor;
            //obutton.style.backgroundImage = 'url("https://gf3.geo.gfsrv.net/cdneb/dfe86378f8c3d7f3ee0790ea64603bc44e83ca47.png")'; //f5f81e8302aaad56c958c033677fb8.png")';
            obutton.style.borderColor = "lightblue";
            obutton.style.borderRadius = "5px";
            obutton.style.cursor  = "pointer";
        }
        parentobj.append( obutton );
        return (obutton);
    }


    addButton( text, btid ) {
        //console.log( "addButton id:" +  btid );
        try {
            var oli = document.createElement("li");

            var espan = document.createElement("span");
            //osp.classList.add("textlabel");
            espan.classList.add("ogl-deut");
            espan.textContent = text;
            espan.id = btid;
            //osp.addEventListener ("click", function() { btClick(this, btid ); }, false);

            var olk = document.createElement("a");
            olk.classList.add("menubutton");
            olk.href = "javascript:";//btClick('" + text + "','" + func + "');";
            //olk.target = "_blank";
            olk.id = btid + "_pb";
            //if( text != "-" )
            //    olk.addEventListener ("click", function() { btClick_Leftm(osp, btid ); }, false);

            olk.append(espan);
            oli.append(olk);
            this.leftM.append(oli);

            return olk;
        } catch ( ex ) { alert( "addButton:" + ex.message ); }
    }

    //async
    saveData( gData, prefix ) {
        prefix = prefix || modulo;
        localStorage.setItem( prefix + this.nmJogador, JSON.stringify(gData))
        return true;
    }

    loadData(prefix) {
        prefix = prefix || modulo;
        return JSON.parse(localStorage.getItem( prefix + this.nmJogador));
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
