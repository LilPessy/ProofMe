import React from 'react';
import './ExperienceCard.css';

function ExperienceCard({ logo, title, type, description, startDate, endDate, outcome, hash }) {
  return (
    <div className="card-container">
      {/* Intestazione Blu */}
      <div className="card-header">
        <img src={logo} alt={`${title} logo`} className="card-logo" />
        <h3 className="card-title">{title}</h3>
      </div>

      {/* Corpo della Card */}
      <div className="card-body">
        
        {/* Sezione Tipo/Descrizione */}
        <div className="info-row">
          <p><strong>Tipo:</strong> {type}</p>
          <p><strong>Descrizione:</strong> {description}</p>
        </div>
        
        <hr className="divider" />

        {/* Sezione Date */}
        <div className="info-row">
          <p><strong>Data Inizio:</strong> {startDate}</p>
          <p><strong>Data Fine:</strong> {endDate}</p>
        </div>

        <hr className="divider" />

        {/* Sezione Risultato (Valutazione o Competenze) */}
        <div className="info-row">
          <p><strong>{outcome.label}:</strong> {outcome.value}</p>
        </div>

        {/* Pillola con l'Hash */}
        <div className="hash-container">
          <span className="hash-text">{hash}</span>
        </div>

      </div>
    </div>
  );
}

export default ExperienceCard;