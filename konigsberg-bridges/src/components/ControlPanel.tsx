import './ControlPanel.css';

interface ControlPanelProps {
  onUndo: () => void;
  onReset: () => void;
  onHint: () => void;
  canUndo: boolean;
}

const ControlPanel = ({ onUndo, onReset, onHint, canUndo }: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <button
        className={`control-button undo-button ${!canUndo ? 'disabled' : ''}`}
        onClick={onUndo}
        disabled={!canUndo}
      >
        <span className="button-icon">↶</span>
        <span className="button-label">撤销</span>
      </button>
      <button className="control-button reset-button" onClick={onReset}>
        <span className="button-icon">↺</span>
        <span className="button-label">重置</span>
      </button>
      <button className="control-button hint-button" onClick={onHint}>
        <span className="button-icon">?</span>
        <span className="button-label">提示</span>
      </button>
    </div>
  );
};

export default ControlPanel;
