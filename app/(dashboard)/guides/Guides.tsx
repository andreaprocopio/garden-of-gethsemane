import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Guides = () => {
  return (
    <div className="py-32 px-4 w-full flex justify-center">
      <Accordion type="multiple" className="w-full max-w-2xl space-y-4">
        <AccordionItem
          value="item-1"
          className="transition-all duration-300 border rounded-lg p-4"
        >
          <AccordionTrigger>How do I use isochronic tones?</AccordionTrigger>
          <AccordionContent>
            Isochronic tones are a form of brainwave entrainment that use evenly
            spaced tones to stimulate the brain. Different frequencies have
            different effects:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>8Hz</strong> – Alpha range: Promotes relaxation and
                light meditation.
              </li>
              <li>
                <strong>10Hz</strong> – Alert relaxation: Ideal for focused
                learning and calm concentration.
              </li>
              <li>
                <strong>12Hz</strong> – High Alpha/Low Beta: Great for enhancing
                mood and mental clarity.
              </li>
              <li>
                <strong>40Hz</strong> – Gamma range: Associated with cognitive
                processing, memory, and consciousness.
              </li>
            </ul>
            Use headphones for best effect, sit or lie down comfortably, and
            choose the tone that matches your goal (e.g. focus, relaxation, or
            sleep).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="transition-all duration-300 border rounded-lg p-4"
        >
          <AccordionTrigger>
            How does guided breathing reduce stress?
          </AccordionTrigger>
          <AccordionContent>
            Slow, intentional breathing—especially when guided—can help shift
            the body from a state of stress to one of calm. This happens by
            activating the <strong>parasympathetic nervous system</strong>,
            which is responsible for the &quot;rest and digest&quot; state.
            <br className="my-2" />
            Techniques like box breathing, 4-7-8 breathing, or simply inhaling
            for 4 seconds and exhaling for 6 can:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Lower heart rate and blood pressure</li>
              <li>Relax muscles and reduce physical tension</li>
              <li>Improve focus and emotional regulation</li>
            </ul>
            Practicing this regularly—especially before sleep or during
            anxiety—can create long-term resilience to stress.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Guides;
