figma.showUI(__html__, {
  title: "Export prototype flow to MP4",
  width: 600,
  height: 800,
});

figma.ui.onmessage = (msg: { type: "select-flow"; flow: string }) => {
  if (msg.type === "select-flow") {
    handleFlowSelect(msg.flow);
  }
};

async function loadFlowStartingPoints() {
  const flows = figma.currentPage.flowStartingPoints;
  console.log(flows);
  figma.ui.postMessage({ type: "flow-starting-points", flows });
}

async function handleFlowSelect(flowStartingPointId: string) {
  const flowStartingPointNode = await figma.getNodeByIdAsync(
    flowStartingPointId
  );
  if (!flowStartingPointNode || flowStartingPointNode.type !== "FRAME") {
    return;
  }
  figma.currentPage.flowStartingPoints;

  const visitedFrames = new Set<string>();
  const framesInFlow: FrameNode[] = [];

  async function traverseFrame(frame: FrameNode) {
    if (visitedFrames.has(frame.id)) {
      return;
    }
    visitedFrames.add(frame.id);
    framesInFlow.push(frame);

    for (const reaction of frame.reactions) {
      if (reaction.action?.type === "NODE" && reaction.action?.destinationId) {
        const destinationNode = (await figma.getNodeByIdAsync(
          reaction.action.destinationId
        )) as FrameNode | null;
        if (destinationNode && destinationNode.type === "FRAME") {
          await traverseFrame(destinationNode);
        }
      }
    }
  }

  await traverseFrame(flowStartingPointNode);

  if (framesInFlow.length === 0) {
    figma.notify("Please select at least one frame.");
    return;
  }

  const transitions: unknown[] = [];

  for (const frame of framesInFlow) {
    if (frame.reactions.length > 0) {
      for (const reaction of frame.reactions) {
        if (reaction.action && reaction.action.type === "NODE") {
          const transition = reaction.action.transition;

          transitions.push({
            startId: frame.id,
            endId: reaction.action.destinationId,
            transitionType: transition ? transition.type : "NONE",
            duration: transition ? transition.duration * 1000 : 0,
            easing: transition ? transition.easing : "LINEAR",
          });
        }
      }
    }
  }

  const frames = await Promise.all(
    framesInFlow.map(async (frame) => ({
      id: frame.id,
      width: frame.width,
      height: frame.height,
      image: await frame.exportAsync({ format: "PNG" }),
    }))
  );

  figma.ui.postMessage({ type: "export", frames, transitions });
}

loadFlowStartingPoints();
