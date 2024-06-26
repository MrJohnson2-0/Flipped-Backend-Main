import express from "express";
const app = express.Router();
import path from "path";
import fs from "fs";
import { dirname } from 'dirname-filename-esm';
import Profile from '../model/profiles.js';
const __dirname = dirname(import.meta);

app.post("/fortnite/api/game/v2/chat/*/*/*/pc", (req, res) => {
    let resp = { "GlobalChatRooms": [{ "roomName": "lawinserverglobal" }] };
    res.json(resp);
});
app.post("/fortnite/api/game/v2/tryPlayOnPlatform/account/*", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(true);
});
app.get("/launcher/api/public/distributionpoints/", (req, res) => {
    res.json({
        "distributions": [
            "https://lawinserver.ol.epicgames.com/"

        ]
    });
});
app.get("/launcher/api/public/assets/*", async (req, res) => {
    res.json({
        "appName": "FortniteContentBuilds",
        "labelName": "LawinServer",
        "buildVersion": "++Fortnite+Release-20.00-CL-19458861-Windows",
        "catalogItemId": "5cb97847cee34581afdbc445400e2f77",
        "expires": "9999-12-31T23:59:59.999Z",
        "items": {
            "MANIFEST": {
                "signature": "LawinServer",
                "distribution": "https://lawinserver.ol.epicgames.com/",
                "path": "Builds/Fortnite/Content/CloudDir/LawinServer.manifest",
                "hash": "55bb954f5596cadbe03693e1c06ca73368d427f3",
                "additionalDistributions": []
            },
            "CHUNKS": {
                "signature": "LawinServer",
                "distribution": "https://lawinserver.ol.epicgames.com/",
                "path": "Builds/Fortnite/Content/CloudDir/LawinServer.manifest",
                "additionalDistributions": []
            }
        },
        "assetId": "FortniteContentBuilds"
    });
});
app.get("/Builds/Fortnite/Content/CloudDir/*.manifest", async (req, res) => {
    res.set("Content-Type", "application/octet-stream");
    const manifest = fs.readFileSync(path.join(__dirname, "../../", "responses", "CloudDir", "LawinServer.manifest"));
    res.status(200).send(manifest).end();
});
app.get("/Builds/Fortnite/Content/CloudDir/*.chunk", async (req, res) => {
    res.set("Content-Type", "application/octet-stream");
    const chunk = fs.readFileSync(path.join(__dirname, "../../", "responses", "CloudDir", "LawinServer.chunk"));
    res.status(200).send(chunk).end();
});
app.get("/Builds/Fortnite/Content/CloudDir/*.ini", async (req, res) => {
    const ini = fs.readFileSync(path.join(__dirname, "../../", "responses", "CloudDir", "Full.ini"));
    res.status(200).send(ini).end();
});
app.get("/waitingroom/api/waitingroom", (req, res) => {
    res.status(204);
    res.end();
});
app.get("/socialban/api/public/v1/*", (req, res) => {
    res.json({
        "bans": [],
        "warnings": []
    });
});
app.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", (req, res) => {
    res.json({});
});
app.get("/fortnite/api/statsv2/account/:accountId", (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
});
app.get("/fortnite/api/statsv2/leaderboards/br_placetop1_keyboardmouse_m0_playlist_defaultsolo", (req, res) => {
    const leaderboardData = [
        {
            account: req.params.accountId,
            value: 7981
        },
        {
            account: req.params.accountId,
            value: 7641
        }
    ];

    res.json(leaderboardData);
});

app.get("/statsproxy/api/statsv2/account/:accountId", (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
});
app.get("/fortnite/api/stats/accountId/:accountId/bulk/window/alltime", (req, res) => {
    const response = {
        startTime: 0,
        endTime: 0,
        stats: [],
        accountId: req.params.accountId,
    };

    res.json(response);
});

app.post("/fortnite/api/feedback/*", (req, res) => {
    res.status(200);
    res.end();
});
app.post("/fortnite/api/statsv2/query", (req, res) => {
    res.json([]);
});
app.post("/statsproxy/api/statsv2/query", (req, res) => {
    res.json([]);
});
app.post("/fortnite/api/game/v2/events/v2/setSubgroup/*", (req, res) => {
    res.status(204);
    res.end();
});
app.get("/fortnite/api/game/v2/enabled_features", (req, res) => {
    res.json([]);
});
app.get("/api/v1/events/Fortnite/download/*", (req, res) => {
    res.json({});
});
app.post("/api/v1/assets/Fortnite/*/*", async (req, res) => {
    if (req.body.hasOwnProperty("FortCreativeDiscoverySurface") && req.body.FortCreativeDiscoverySurface == 0) {
        const discovery_api_assets = JSON.parse(fs.readFileSync(path.join(__dirname, "../../responses/discovery/discovery_api_assets.json"), "utf8"));
        res.json(discovery_api_assets)
    }
    else {
    res.json({
        "FortCreativeDiscoverySurface": {
            "meta": {
                "promotion": req.body.FortCreativeDiscoverySurface || 0
            },
            "assets": {}
        }
    });
}
} );
app.get("/fortnite/api/game/v2/twitch/*", (req, res) => {
    res.status(200);
    res.end();
});
app.get("/fortnite/api/game/v2/world/info", (req, res) => {
    res.json({});
});
app.post("/fortnite/api/game/v2/chat/*/recommendGeneralChatRooms/pc", (req, res) => {
    res.json({});
});
app.get("/fortnite/api/receipts/v1/account/*/receipts", (req, res) => {
    res.json([]);
});
app.get("/fortnite/api/game/v2/leaderboards/cohort/*", (req, res) => {
    res.json([]);
});
app.get("/backend/TestConnection", (req, res) => {
    res.send("Success");
});
app.post("/datarouter/api/v1/public/data", (req, res) => {
    res.status(204);
    res.end();
});
app.post("/api/v1/assets/Fortnite/*/*", async (req, res) => {
    res.json({"FortCreativeDiscoverySurface":{"meta":{"promotion":1},"assets":{}}})
})

app.get("/region", async (req, res) => {
    res.json({
        "continent": {
            "code": "EU",
            "geoname_id": 6255148,
            "names": {
                "de": "Europa",
                "en": "Europe",
                "es": "Europa",
                "fr": "Europe",
                "ja": "ヨーロッパ",
                "pt-BR": "Europa",
                "ru": "Европа",
                "zh-CN": "欧洲"
            }
        },
        "country": {
            "geoname_id": 2635167,
            "is_in_european_union": false,
            "iso_code": "GB",
            "names": {
                "de": "UK",
                "en": "United Kingdom",
                "es": "RU",
                "fr": "Royaume Uni",
                "ja": "英国",
                "pt-BR": "Reino Unido",
                "ru": "Британия",
                "zh-CN": "英国"
            }
        },
        "subdivisions": [
            {
                "geoname_id": 6269131,
                "iso_code": "ENG",
                "names": {
                    "de": "England",
                    "en": "England",
                    "es": "Inglaterra",
                    "fr": "Angleterre",
                    "ja": "イングランド",
                    "pt-BR": "Inglaterra",
                    "ru": "Англия",
                    "zh-CN": "英格兰"
                }
            },
            {
                "geoname_id": 3333157,
                "iso_code": "KEC",
                "names": {
                    "en": "Royal Kensington and Chelsea"
                }
            }
        ]
    })
})
export default app;
//# sourceMappingURL=main.js.map