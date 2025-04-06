import React from 'react';
    import { motion } from 'framer-motion';
    import { FaCheckCircle, FaTimesCircle, FaUser, FaStar } from 'react-icons/fa';

    const AttributeComparison = ({ attributes, weights }) => {
      const attributeLabels = {
        Arched_Eyebrows: "Arched Eyebrows",
        Attractive: "Attractive",
        Bags_Under_Eyes: "Bags Under Eyes",
        Bald: "Bald",
        Bangs: "Bangs",
        Big_Lips: "Big Lips",
        Big_Nose: "Big Nose",
        Black_Hair: "Black Hair",
        Blond_Hair: "Blond Hair",
        Blurry: "Blurry",
        Brown_Hair: "Brown Hair",
        Bushy_Eyebrows: "Bushy Eyebrows",
        Chubby: "Chubby",
        Double_Chin: "Double Chin",
        Eyeglasses: "Eyeglasses",
        Goatee: "Goatee",
        Gray_Hair: "Gray Hair",
        Heavy_Makeup: "Heavy Makeup",
        High_Cheekbones: "High Cheekbones",
        Male: "Male",
        Mouth_Slightly_Open: "Mouth Slightly Open",
        Mustache: "Mustache",
        Narrow_Eyes: "Narrow Eyes",
        No_Beard: "No Beard",
        Oval_Face: "Oval Face",
        Pale_Skin: "Pale Skin",
        Pointy_Nose: "Pointy Nose",
        Receding_Hairline: "Receding Hairline",
        Rosy_Cheeks: "Rosy Cheeks",
        Sideburns: "Sideburns",
        Smiling: "Smiling",
        Straight_Hair: "Straight Hair",
        Wavy_Hair: "Wavy Hair",
        Wearing_Earrings: "Wearing Earrings",
        Wearing_Hat: "Wearing Hat",
        Wearing_Lipstick: "Wearing Lipstick",
        Wearing_Necklace: "Wearing Necklace",
        Wearing_Necktie: "Wearing Necktie",
        Young: "Young"
      };

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.6,
          }
        }
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      };

      return (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">Feature Breakdown</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(attributes).map(([key, value]) => {
              const weight = weights ? weights[key] : 1;
              const matchColor = value.match ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200';
              const textColor = weight > 1 ? 'text-blue-800' : 'text-gray-800';

              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className={`p-4 rounded-lg shadow flex items-center justify-between ${matchColor}`}
                  style={{ opacity: weight }}
                >
                  <div>
                    <p className={`font-medium ${textColor}`}>{attributeLabels[key] || key}</p>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <FaUser className="text-blue-500" title="Your Feature" /> {value.user ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <FaStar className="text-yellow-500" title="Celebrity Feature" /> {value.celebrity ? "Yes" : "No"}
                    </div>
                  </div>
                  {value.match ? (
                    <FaCheckCircle className="text-green-500 text-2xl flex-shrink-0 ml-2" title="Match" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-2xl flex-shrink-0 ml-2" title="No Match" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      );
    };

    export default AttributeComparison;
