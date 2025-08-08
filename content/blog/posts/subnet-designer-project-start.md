# Subnet Designer & Visualizer Project
## A VLSM Calculator and Network Topology Visualization Tool

![Project Overview Banner](https://i.imgur.com/fN9BJLT.png)

> **Executive Summary**: Building a Python-powered VLSM calculator and network topology visualizer to bridge theory and practice in my networking studies at Algonquin College.

## Project Background

As a student in the **Computer Systems Technician - Networking** program at Algonquin College, I've been learning about IPv4 addressing, subnetting, and Variable Length Subnet Masking (VLSM) in **CST 8182**. While these concepts are intellectually engaging, I recognized the need for a more hands-on approach to master these fundamental networking principles.

This led me to conceive the **Subnet Designer & Visualizer** project—a Python application designed to transform abstract networking principles into tangible, visual understanding while serving as a practical tool for network design and documentation.

## Project Scope and Objectives

![Project Objectives](https://i.imgur.com/VrKZPAA.png)

### Primary Goals

| **Objective** | **Description** | **Success Criteria** |
|---------------|-----------------|----------------------|
| **Educational Enhancement** | Reinforce networking concepts through practical application | Improved understanding of VLSM and subnetting |
| **Tool Development** | Create a functional subnet calculator and visualizer | Working MVP with core features implemented |
| **Skill Integration** | Combine networking knowledge with Python programming | Demonstrable proficiency in both domains |
| **Community Contribution** | Develop an open-source tool for fellow students | Positive feedback and adoption by peers |

### Target Deliverables

1. **VLSM Calculator Engine**: Intelligent subnet allocation based on host requirements
2. **Visual Topology Generator**: Professional network diagrams with industry-standard symbols
3. **Educational Interface**: Step-by-step calculation explanations and tutorials
4. **Documentation System**: Comprehensive user guides and API documentation

## Technical Architecture

![System Architecture](https://i.imgur.com/g1qHKs8.png)

### Technology Stack

| **Layer** | **Technology** | **Justification** | **Priority** |
|-----------|----------------|-------------------|-------------|
| **Core Logic** | Python 3.8+ | Strong networking libraries | High |
| **Networking Libraries** | ipaddress, netaddr | Built-in IP manipulation | High |
| **Visualization** | matplotlib, networkx | Professional diagramming | Medium |
| **User Interface** | tkinter/PyQt5 | Cross-platform compatibility | Medium |
| **Testing** | pytest, unittest | Comprehensive testing | High |
| **Documentation** | Sphinx, Markdown | Professional documentation | Low |

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                 Subnet Designer & Visualizer                │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer                                         │
│  ├── Command Line Interface (argparse)                     │
│  ├── Graphical User Interface (tkinter/PyQt)               │
│  └── Web Interface (Flask - future enhancement)            │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                       │
│  ├── VLSM Calculation Engine                               │
│  ├── Network Topology Generator                            │
│  ├── Input Validation System                               │
│  └── Educational Content Manager                           │
├─────────────────────────────────────────────────────────────┤
│  Data Access Layer                                         │
│  ├── Network Object Models                                 │
│  ├── Configuration Management                              │
│  └── Export/Import Handlers                                │
└─────────────────────────────────────────────────────────────┘
```

### Core Algorithm Preview

```python
def calculate_vlsm_allocation(base_network, requirements):
    """Calculate optimal VLSM allocation for given requirements"""
    import ipaddress
    import math
    
    # Sort requirements by host count (descending)
    sorted_requirements = sorted(requirements, 
                               key=lambda x: x[1], 
                               reverse=True)
    
    base = ipaddress.IPv4Network(base_network)
    available_addresses = list(base.hosts())
    allocation_plan = {}
    
    for subnet_name, host_count in sorted_requirements:
        # Calculate required subnet size
        required_size = 2 ** math.ceil(math.log2(host_count + 2))
        subnet_bits = 32 - math.log2(required_size)
        
        # Find available space and allocate
        # Implementation details would go here
        
    return allocation_plan
```

## Development Timeline

![Development Timeline](https://i.imgur.com/zcP8m3R.png)

### Phase 1: Foundation and Research (Weeks 1-2)

- **Week 1**: Architecture design, library evaluation, environment setup
- **Week 2**: Core data structures, basic calculation engine, testing framework

### Phase 2: Core Implementation (Weeks 3-4)

- **Week 3**: Advanced VLSM algorithms, input validation, error handling
- **Week 4**: Command-line interface, output formatting, performance optimization

### Phase 3: Visualization and Interface (Weeks 5-6)

- **Week 5**: Matplotlib integration, topology generation, export functionality
- **Week 6**: GUI development, interactive features, UX refinement

### Phase 4: Enhancement and Documentation (Weeks 7-8)

- **Week 7**: Educational mode, tutorial system, advanced features
- **Week 8**: Documentation completion, code cleanup, open source preparation

## Real-World Application Example

### Small Business Network: TechStart Inc.

| **Department** | **Staff** | **Growth (1yr)** | **Required Hosts** | **Allocation** |
|----------------|-----------|------------------|-------------------|---------------|
| **Management** | 8 | +25% | 10 | /28 (14 hosts) |
| **Development** | 20 | +25% | 25 | /27 (30 hosts) |
| **Sales** | 12 | +25% | 15 | /28 (14 hosts) |
| **Guest Network** | Variable | N/A | 50 | /26 (62 hosts) |
| **Servers** | 4 | +100% | 8 | /29 (6 hosts) |

#### VLSM Allocation Plan

```
Base Network: 192.168.1.0/24

Subnet Allocations:
├── Guest Network:     192.168.1.0/26   (62 usable hosts)
├── Development:       192.168.1.64/27  (30 usable hosts)  
├── Sales:            192.168.1.96/28   (14 usable hosts)
├── Management:       192.168.1.112/28  (14 usable hosts)
├── Servers:          192.168.1.128/29  (6 usable hosts)
└── Future Expansion: 192.168.1.136/29  (Reserved)

Utilization: 126/254 addresses (49.6%)
```

## Technical Challenges & Solutions

| **Challenge** | **Problem** | **Proposed Solution** | **Priority** |
|--------------|------------|----------------------|-------------|
| **Algorithm Optimization** | Minimizing IP address waste | Multiple allocation strategies with user choice | High |
| **Visualization Scalability** | Large networks become cluttered | Multi-level zoom with detail-on-demand | Medium |
| **User Experience** | Balancing simplicity with power | Mode-based UI with contextual assistance | Medium |
| **Performance** | Handling large address spaces | Efficient data structures and caching | Low |

## Success Metrics

### Quantitative Metrics

- **Feature Completion**: >95% of planned features implemented
- **Performance**: <100ms calculation speed for /16 networks
- **Accuracy**: 100% precision in subnet calculations
- **Adoption**: 10+ active student users

### Qualitative Assessment

- **Code Quality**: Readability, maintainability, documentation
- **Educational Value**: Learning enhancement, concept reinforcement
- **Professional Standards**: Industry best practices, documentation quality
- **Innovation**: Novel approaches, creative solutions

## Risk Assessment

| **Risk** | **Probability** | **Impact** | **Mitigation Strategy** |
|----------|---------------|-----------|------------------------|
| **Complex implementation** | Medium | High | Incremental development with testing |
| **Development delays** | High | Medium | Agile methodology with flexible scope |
| **Learning curve** | Medium | Medium | Dedicated research time and consultation |
| **Insufficient testing** | Low | High | Comprehensive testing strategy |

## Community Impact & Open Source Strategy

### Contribution Framework

- **Educational Resource** for CST 8182 students via GitHub repository
- **Teaching Tool** for networking instructors with classroom integration guide
- **Professional Utility** for network engineers needing calculation tools
- **Open Source Contribution** with well-documented, maintainable code

## Future Enhancements

### Short-term (Next Semester)
- Web interface using Flask
- Advanced 3D visualizations
- Multi-user collaboration features
- Mobile companion app

### Long-term (1-2 Years)
- Industry adoption in networking programs
- Professional tool status among network engineers
- Active contributor community
- Influence on educational standards

## Learning Outcomes

### Technical Skills
- **Python Programming**: Object-oriented design, algorithm implementation
- **Network Engineering**: VLSM, subnetting, topology design
- **Software Engineering**: Testing, documentation, version control
- **User Interface Design**: Usability, accessibility, visual design

### Professional Development
- **Project Management**: Timeline tracking and delivery
- **Technical Communication**: Documentation and presentation
- **Collaboration**: Open source contribution
- **Problem Solving**: Complex technical challenges

## Next Steps

1. **Finalize Technical Specifications**: Complete detailed system design
2. **Establish Development Environment**: Configure necessary tools
3. **Begin Core Implementation**: Start with fundamental data structures
4. **Initiate Community Engagement**: Set up GitHub repository

---

**Project Repository**: [GitHub - Coming Soon]  
**Contact**: Available through portfolio contact form  
**Timeline**: January 2025 - March 2025  
**Target Release**: End of Winter 2025 semester

---

*This project bridges academic learning with practical application, reinforcing networking principles while developing professional software skills and contributing to the educational community.*