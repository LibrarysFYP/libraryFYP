const express = require("express");
const appSettingsController = require("../controller/appSettingController");
const authController = require("../controller/authenticationController");
const router = express.Router();

// router.param('id', tourController.checkId);
// router.use('/:tourId/reviews', reviewRouter);
router.route("/").get(appSettingsController.getSettings);
router
    .route("/:id")
    .patch(
        appSettingsController.uploadFieldsPhoto,
        appSettingsController.resizePhoto,
        appSettingsController.updateSettings
    );

module.exports = router;