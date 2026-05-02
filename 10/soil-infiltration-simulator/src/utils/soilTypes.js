export const soilTypes = {
  clay: {
    name: '黏土',
    particleSize: '0.002mm 以下',
    particleSizeMm: 0.002,
    infiltrationRate: 1.5,
    maxInfiltration: 50,
    porosity: 0.3,
    color: '#8B4513',
    lightColor: '#CD853F',
    description: '黏土颗粒极细，孔隙小，渗透性差，保水能力强'
  },
  loess: {
    name: '黄土',
    particleSize: '0.002-0.05mm',
    particleSizeMm: 0.025,
    infiltrationRate: 8,
    maxInfiltration: 200,
    porosity: 0.45,
    color: '#D2B48C',
    lightColor: '#F5DEB3',
    description: '黄土颗粒中等，渗透性适中，保水能力一般'
  },
  sand: {
    name: '砂土',
    particleSize: '0.05-2mm',
    particleSizeMm: 1,
    infiltrationRate: 25,
    maxInfiltration: 400,
    porosity: 0.35,
    color: '#F4A460',
    lightColor: '#FFE4B5',
    description: '砂土颗粒大，孔隙大，渗透性好，保水能力差'
  }
}

export const getSoilTypeKeys = () => Object.keys(soilTypes)
export const getSoilType = (type) => soilTypes[type]
