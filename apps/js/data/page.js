var pageres = [
    {
        "resolution": 320,
        "dimension": {
            "width": 320,
            "height": 517,
            "lnavwidth" : 20,
            "rnavwidth" : 20
        }
    },
    {
        "resolution": 480,
        "dimension": {
            "width": 480,
            "height": 776,
            "lnavwidth" : 20,
            "rnavwidth" : 20
        }
    },
    {
        "resolution": 800,
        "dimension": {
            "width": 800,
            "height": 1294,
            "lnavwidth" : 20,
            "rnavwidth" : 20
        }
    },
    {
        "resolution": 1280,
        "dimension": {
            "width": 1280,
            "height": 2071,
            "lnavwidth" : 20,
            "rnavwidth" : 20
        }
    },
    {
        "resolution": 1920,
        "dimension": {
            "width": 1920,
            "height": 3106,
            "lnavwidth" : 20,
            "rnavwidth" : 20
        }
    }
];

function getPageRes(resolution) {
    for ( i = 0; i < pageres.length; i++ ) {
        if ( resolution == pageres[i].resolution ) {
            return pageres[i].dimension;
        }
    }
}