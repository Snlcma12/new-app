import React, { useState, useEffect } from 'react';


function Graph3DUI() {
  const [surface, setSurface] = useState('tor');
  const [showPoints, setShowPoints] = useState(true);
  const [showEdges, setShowEdges] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);
  const [meshColor, setMeshColor] = useState('#e66465');

  useEffect(() => {
    
  }, [surface, showPoints, showEdges, showPolygons, meshColor]);

  return (
    <div className="graphics3d">
      <div className="gp3d">
        <label htmlFor="SelectSurface">Выберите:</label>
        <select id="SelectSurface" onChange={(e) => setSurface(e.target.value)}>
          <option value="tor">Торус</option>
        </select>
      </div>
      <div className="gp3d">
        <input className="surfaceCustom" data-custom="pointOnly" id="pointOnly" type="checkbox" checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)} />
        <label htmlFor="pointOnly">Точки</label>
      </div>
      <div className="gp3d">
        <input className="surfaceCustom" data-custom="edgesOnly" id="edgesOnly" type="checkbox" checked={showEdges} onChange={(e) => setShowEdges(e.target.checked)} />
        <label htmlFor="edgesOnly">Ребра</label>
      </div>
      <div className="gp3d">
        <input className="surfaceCustom" data-custom="polygonsOnly" id="polygonsOnly" type="checkbox" checked={showPolygons} onChange={(e) => setShowPolygons(e.target.checked)} />
        <label htmlFor="polygonsOnly">Полигоны</label>
      </div>
      <div className="gp3d">
        <input className="surfaceCustom" data-custom="color" type="color" id="meshColor" value={meshColor} onChange={(e) => setMeshColor(e.target.value)} />
        <label htmlFor="meshColor">Цвет</label>
      </div>
      <canvas id="graph3D"></canvas>
    </div>
  );
}


export default Graph3DUI;
