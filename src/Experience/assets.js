export default [
    {
        name: 'base',
        data: {},
        items:
        [
            
            { name: 'googleHomeLedMaskTexture', source: '/textures/googleHomeLedMask.png', type: 'texture' }, // working (texture)
            { name: 'googleHomeLedsModel', source: '/models/googleHomeLedsModel.glb', type: 'model' }, // working
            
            { name: 'loupedeckButtonsModel', source: '/models/loupedeckButtonsModel.glb', type: 'model' }, // err
            
            { name: 'topChairModel', source: '/models/topChairModel.glb', type: 'model' }, // err
            
            { name: 'coffeeSteamModel', source: '/models/coffeeSteamModel.glb', type: 'model' }, // err
            
            { name: 'elgatoLightModel', source: '/models/elgatoLightModel.glb', type: 'model' }, // working
            
            { name: 'threejsJourneyLogoTexture', source: '/icons/logo.png', type: 'texture' }, // working (texture)
            
            { name: 'pcScreenModel', source: '/models/pcScreenModel.glb', type: 'model' }, // err
            { name: 'macScreenModel', source: '/models/macScreenModel.glb', type: 'model' }, // working
            
            { name: 'bakedDayTexture', source: '/textures/bakedDay.jpg', type: 'texture' }, // working (texture)
            { name: 'bakedNightTexture', source: '/textures/bakedNight.jpg', type: 'texture' }, // working (texture)
            { name: 'bakedNeutralTexture', source: '/textures/bakedNeutral.jpg', type: 'texture' }, // working (texture)
            { name: 'lightMapTexture', source: '/textures/lightMap.jpg', type: 'texture' }, // working (texture)
            { name: 'roomModel', source: '/models/roomModel.glb' }, // err
        ]
    }
]