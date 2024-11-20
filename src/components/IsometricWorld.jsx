import React, { useState, useEffect } from 'react';
import './IsometricWorld.css';
import amazonSprite from './assets/amazon-sprite.png'; // Assurez-vous du bon chemin
import amazon from './assets/amazon.png';

const IsometricWorld = () => {
  const gridSize = 10; // Taille de la grille 10x10
  const tileWidth = 64; // Largeur d'une tuile
  const tileHeight = 32; // Hauteur d'une tuile

  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState(null);
  const [isFacingRight, setIsFacingRight] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleTileClick = (x, y) => {
    if (characterPosition.x === x && characterPosition.y === y) {
      const screenX = (x - y) * (tileWidth / 2) + gridSize * (tileWidth / 2);
      const screenY = (x + y) * (tileHeight / 2);
      setMenuPosition({ x: screenX, y: screenY });
      setShowContextMenu(true);
    } else {
      setTargetPosition({ x, y });
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    if (targetPosition) {
      moveCharacter();
    }
  }, [targetPosition]);

  const moveCharacter = () => {
    const { x: currentX, y: currentY } = characterPosition;
    const { x: targetX, y: targetY } = targetPosition;

    if (currentX === targetX && currentY === targetY) {
      setTargetPosition(null);
      return;
    }

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    let nextX = currentX;
    let nextY = currentY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      nextX += deltaX > 0 ? 1 : -1;
      setIsFacingRight(deltaX > 0);
    } else if (deltaY !== 0) {
      nextY += deltaY > 0 ? 1 : -1;
    }

    setTimeout(() => {
      setCharacterPosition({ x: nextX, y: nextY });
    }, 200);
  };

  useEffect(() => {
    if (
      targetPosition &&
      (characterPosition.x !== targetPosition.x ||
        characterPosition.y !== targetPosition.y)
    ) {
      moveCharacter();
    }
  }, [characterPosition]);

  const handleMenuAction = action => {
    alert(`Action choisie : ${action}`);
    setShowContextMenu(false);
  };

  const getTileStyle = (x, y) => {
    const tileX = x % 6; // Position de la tuile sur la grille 6x6
    const tileY = y % 6;
    return {
      backgroundImage: `url(${amazon})`,
      backgroundPosition: `-${tileX * tileWidth}px -${tileY * tileHeight}px`,
      width: `${tileWidth}px`,
      height: `${tileHeight}px`,
    };
  };

  const tiles = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const screenX = (x - y) * (tileWidth / 2);
      const screenY = (x + y) * (tileHeight / 2);

      const isCharacterHere =
        characterPosition.x === x && characterPosition.y === y;

      tiles.push(
        <div
          key={`tile-${x}-${y}`}
          className="grid-tile"
          style={{
            ...getTileStyle(x, y),
            left: `${screenX + gridSize * (tileWidth / 2)}px`,
            top: `${screenY}px`,
          }}
          onClick={() => handleTileClick(x, y)}
        >
          {isCharacterHere && (
            <img
              src={amazonSprite}
              alt="Character"
              className={`character-sprite ${isFacingRight ? '' : 'flipped'}`}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="isometric-grid">
      {tiles}
      {showContextMenu && (
        <div
          className="context-menu"
          style={{
            left: `${menuPosition.x}px`,
            top: `${menuPosition.y}px`,
          }}
        >
          <ul>
            <li onClick={() => handleMenuAction("Parler avec l'avatar")}>
              Parler avec l'avatar
            </li>
            <li onClick={() => handleMenuAction('Éditer le personnage')}>
              Éditer le personnage
            </li>
            <li onClick={() => handleMenuAction('Voir les infos personnage')}>
              Voir les infos personnage
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IsometricWorld;
