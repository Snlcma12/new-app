import React from 'react';
import Graph3D from './Graph3D';

function Graph3DContainer() {
    return (
        <div className="graph3D">
            <div className="gp3d">
                <label htmlFor="SelectSurface">Выберите:</label>
                <select id="SelectSurface">
                    <option value="cube">Куб</option>
                </select>
            </div>
            <div className="gp3d">
                <input className='surfaceCustom' data-custom='pointOnly' id="pointOnly" type="checkbox" defaultChecked />
                <label htmlFor="pointOnly">Точки</label>
            </div>
            <div className="gp3d">
                <input className='surfaceCustom' data-custom='edgesOnly' id="edgesOnly" type="checkbox" defaultChecked />
                <label htmlFor="edgesOnly">Ребра</label>
            </div>
            <div className="gp3d">
                <input className='surfaceCustom' data-custom='polygonsOnly' id="polygonsOnly" type="checkbox" defaultChecked />
                <label htmlFor="polygonsOnly">Полигоны</label>
            </div>
            <div className="gp3d">
                <input className='surfaceCustom' data-custom='color' type="color" id="meshColor" defaultValue="#e66465" />
                <label htmlFor="meshColor">Color</label>
            </div>
            <div className="gp3d">
                <input id="animationActive" type="checkbox" defaultChecked />
                <label htmlFor="animationActive">Анимация</label>
            </div>
            <Graph3D />
        </div>
    );
}

export default Graph3DContainer;
