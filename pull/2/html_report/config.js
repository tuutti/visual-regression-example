report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/0835732027_Landing_page_0_document_0_Breakpoint_XS.png",
        "test": "../bitmaps_test/20240421-162611/0835732027_Landing_page_0_document_0_Breakpoint_XS.png",
        "selector": "document",
        "fileName": "0835732027_Landing_page_0_document_0_Breakpoint_XS.png",
        "label": "Landing page",
        "requireSameDimensions": 0.1,
        "misMatchThreshold": 0.1,
        "url": "https://visual-regression-example.docker.so/user",
        "expect": 0,
        "viewportLabel": "Breakpoint_XS",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -71
          },
          "rawMisMatchPercentage": 18.597787467700257,
          "misMatchPercentage": "18.60",
          "analysisTime": 35
        },
        "diffImage": "../bitmaps_test/20240421-162611/failed_diff_0835732027_Landing_page_0_document_0_Breakpoint_XS.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/0835732027_Landing_page_0_document_1_Breakpoint_XL.png",
        "test": "../bitmaps_test/20240421-162611/0835732027_Landing_page_0_document_1_Breakpoint_XL.png",
        "selector": "document",
        "fileName": "0835732027_Landing_page_0_document_1_Breakpoint_XL.png",
        "label": "Landing page",
        "requireSameDimensions": 0.1,
        "misMatchThreshold": 0.1,
        "url": "https://visual-regression-example.docker.so/user",
        "expect": 0,
        "viewportLabel": "Breakpoint_XL",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -108
          },
          "rawMisMatchPercentage": 13.101475774745605,
          "misMatchPercentage": "13.10",
          "analysisTime": 68
        },
        "diffImage": "../bitmaps_test/20240421-162611/failed_diff_0835732027_Landing_page_0_document_1_Breakpoint_XL.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/0835732027_Landing_page_0_document_2_Breakpoint_XXL.png",
        "test": "../bitmaps_test/20240421-162611/0835732027_Landing_page_0_document_2_Breakpoint_XXL.png",
        "selector": "document",
        "fileName": "0835732027_Landing_page_0_document_2_Breakpoint_XXL.png",
        "label": "Landing page",
        "requireSameDimensions": 0.1,
        "misMatchThreshold": 0.1,
        "url": "https://visual-regression-example.docker.so/user",
        "expect": 0,
        "viewportLabel": "Breakpoint_XXL",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 10.127821180555555,
          "misMatchPercentage": "10.13",
          "analysisTime": 111
        },
        "diffImage": "../bitmaps_test/20240421-162611/failed_diff_0835732027_Landing_page_0_document_2_Breakpoint_XXL.png"
      },
      "status": "fail"
    }
  ]
});