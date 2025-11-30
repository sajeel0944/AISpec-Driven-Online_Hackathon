---
sidebar_position: 1
---

# Basic Robot Programming

This guide introduces fundamental concepts and practical steps for programming robots, with a focus on humanoids and Physical AI applications. Understanding these basics is crucial for controlling simulated and real-world robotic systems.

## Key Programming Paradigms

Robot programming often involves several key approaches:

-   **Direct Control**: Sending explicit commands for joint movements, motor speeds, or end-effector positions.
-   **Task-Level Programming**: Defining high-level tasks (e.g., "pick up object," "navigate to location") which the robot's internal AI translates into lower-level actions.
-   **Behavior-Based Programming**: Designing reactive behaviors that respond to sensory input, allowing robots to operate robustly in dynamic environments.
-   **Learning-Based Programming**: Using machine learning (e.g., reinforcement learning) to train robots to perform tasks through experience.

## Essential Tools and Languages

-   **Python**: Widely used in robotics due to its simplicity, extensive libraries (NumPy, SciPy), and strong support in frameworks like ROS 2.
-   **C++**: Offers high performance and control over hardware resources, often used for low-level control loops and real-time operations.
-   **ROS 2 (Robot Operating System 2)**: A flexible framework for writing robot software, providing tools, libraries, and conventions for modular development.

## Programming Robot Movement (Example with ROS 2 and Python)

Let's illustrate basic robot programming by sending velocity commands to a differential drive robot (a common model for mobile robots, and concepts extend to humanoid base movement).

### 1. Setup Your ROS 2 Workspace

Ensure you have a ROS 2 workspace set up and sourced. If not, refer to the "Simulating with Gazebo" guide.

### 2. Create a ROS 2 Package

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_robot_controller --dependencies rclpy geometry_msgs
```

### 3. Write the Python Node

Create a file `~/ros2_ws/src/my_robot_controller/my_robot_controller/teleop_node.py` and add the following content:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class TeleopPublisher(Node):

    def __init__(self):
        super().__init__('teleop_publisher')
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = Twist()
        # Example: Move forward and turn
        msg.linear.x = 0.5  # Linear velocity (m/s)
        msg.angular.z = 0.2  # Angular velocity (rad/s)
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing cmd_vel: linear.x={msg.linear.x}, angular.z={msg.angular.z}')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    teleop_publisher = TeleopPublisher()
    rclpy.spin(teleop_publisher)
    teleop_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### 4. Update `setup.py`

In `~/ros2_ws/src/my_robot_controller/setup.py`, ensure the `entry_points` includes your node:

```python
# ... (other imports)
entry_points={
    'console_scripts': [
        'teleop_node = my_robot_controller.teleop_node:main',
    ],
},
# ...
```

### 5. Build and Run

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_controller
source install/setup.bash
ros2 run my_robot_controller teleop_node
```

If you have a simulated robot subscribed to `/cmd_vel` (like in Gazebo), you should see it move according to these commands.

## Next Steps

Experiment with different velocity values, explore joint position control for humanoid arms, and integrate sensor feedback to create more intelligent robot behaviors.