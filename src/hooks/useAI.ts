import { AccessibilityPoint } from '../types';

export const useAI = () => {
  const summarizeArea = async ({ points }: { points: AccessibilityPoint[] }): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const barriers = points.filter(p => p.type === 'barrier');
    const facilitators = points.filter(p => p.type === 'facilitator');
    const pois = points.filter(p => p.type === 'poi');
    
    // Generate intelligent summary based on data
    let summary = "📍 **Accessibility Overview**\n\n";
    
    if (points.length === 0) {
      return summary + "No accessibility data available for this area. Consider contributing by reporting accessibility features you encounter!";
    }
    
    // Barriers analysis
    if (barriers.length > 0) {
      const barrierTypes = barriers.reduce((acc, barrier) => {
        const type = barrier.tags.barrier || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      summary += `🚧 **${barriers.length} Barrier${barriers.length > 1 ? 's' : ''} Found:**\n`;
      Object.entries(barrierTypes).forEach(([type, count]) => {
        summary += `• ${count} ${type.replace('_', ' ')} issue${count > 1 ? 's' : ''}\n`;
      });
      summary += "\n";
    }
    
    // Facilitators analysis
    if (facilitators.length > 0) {
      const facilitatorTypes = facilitators.reduce((acc, facilitator) => {
        const type = facilitator.tags.amenity || 'accessibility feature';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      summary += `✅ **${facilitators.length} Accessibility Helper${facilitators.length > 1 ? 's' : ''}:**\n`;
      Object.entries(facilitatorTypes).forEach(([type, count]) => {
        summary += `• ${count} ${type.replace('_', ' ')}${count > 1 ? 's' : ''}\n`;
      });
      summary += "\n";
    }
    
    // POIs analysis
    if (pois.length > 0) {
      const accessibleCount = pois.filter(poi => poi.tags.wheelchair === 'yes').length;
      const limitedCount = pois.filter(poi => poi.tags.wheelchair === 'limited').length;
      const notAccessibleCount = pois.filter(poi => poi.tags.wheelchair === 'no').length;
      
      summary += `🏢 **${pois.length} Accessible Place${pois.length > 1 ? 's' : ''}:**\n`;
      if (accessibleCount > 0) summary += `• ${accessibleCount} fully accessible\n`;
      if (limitedCount > 0) summary += `• ${limitedCount} limited accessibility\n`;
      if (notAccessibleCount > 0) summary += `• ${notAccessibleCount} not accessible\n`;
      summary += "\n";
    }
    
    // Overall assessment
    const totalFeatures = facilitators.length + pois.filter(p => p.tags.wheelchair === 'yes').length;
    const totalBarriers = barriers.length + pois.filter(p => p.tags.wheelchair === 'no').length;
    
    if (totalFeatures > totalBarriers) {
      summary += "🌟 **Overall:** This area appears to be relatively accessible with good infrastructure support.";
    } else if (totalBarriers > totalFeatures) {
      summary += "⚠️ **Overall:** This area may present accessibility challenges. Exercise caution and plan alternative routes.";
    } else {
      summary += "📊 **Overall:** Mixed accessibility - some helpful features available but barriers exist.";
    }
    
    return summary;
  };

  return { summarizeArea };
};